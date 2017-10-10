#!/user/bin/python

import uuid
from os import walk
import xml.sax
import Queue

class ReportHandler( xml.sax.ContentHandler):
  def __init__(self):
    self.clazz = ""
    self.reportName = None
    self.charts = {}
    self.builders = {}
    self.chart = None
    self.metric = None
    self.builder = None
    self.clazz = None
    self.parentClazz = None
    self.clazzQueue = Queue.Queue()
    self.idMetricMap = {}
    self.metricIdMap = {}

  def startElement(self, tag, attributes):
    if tag == "bean":
      if self.parentClazz != None:
        self.clazzQueue.put_nowait(self.parentClazz)
      self.parentClazz = self.clazz
      self.clazz = attributes["class"]
      if self.clazz == "com.sematext.af.report.report.ChartDescription":
        self.currentData = "chart"
        self.chart = {}
        self.charts[attributes["id"]] = self.chart
        print 'ChartDescription', attributes["id"]
      elif self.clazz == "com.sematext.af.report.af.report.AFReportBuilder" or self.clazz == "com.sematext.af.report.af.report.AFMultiValueReportBuilder" or self.clazz == "com.sematext.spm.rawtsf.AFRAWTSFReportBuilder":
        self.currentData = "metric"
        self.builder = []
        if attributes.has_key("id"):
          self.builders[attributes["id"]] = self.builder
          print 'AFReportBuilder', attributes["id"]
        else:
          self.builders[self.chart["reportBuilder"]] = self.builder
          print 'AFReportBuilder', self.chart["reportBuilder"]
      elif self.clazz == "com.sematext.af.report.af.report.AFDataSeriesDescription" or self.clazz == "com.sematext.af.report.af.report.AFComplexDataSeriesDescription":
        self.metric = {}
        if self.parentClazz != None:
          self.builder.append(self.metric)
        else:
          id = attributes["id"]
          if self.metricIdMap.has_key(id):
            self.metricIdMap[id].append(self.metric)
          else:
            self.idMetricMap[id] = self.metric
    elif tag == "property":
      name = attributes["name"]
      if self.clazz == "com.sematext.af.report.report.ReportDescription":
        if name == "reportLabel":
          self.reportName = attributes["value"]
      elif self.clazz == "com.sematext.af.report.report.ChartDescription":
        if name == "chartKey" or name == "chartName":
          self.chart[name] = attributes["value"]
        elif name == "reportBuilder":
          if attributes.has_key("ref"):
            self.chart[name] = attributes["ref"]
          else:
            self.chart[name] = uuid.uuid1()
      elif self.clazz == "com.sematext.af.report.af.report.AFDataSeriesDescription" or self.clazz == "com.sematext.af.report.af.report.AFComplexDataSeriesDescription":
        if name == "metricName" or name == "label" or name == "key" or name == "legendTooltip":
          self.metric[name] = attributes["value"]
    elif tag == "ref":
      bean = attributes["bean"]
      if self.idMetricMap.has_key(bean):
        self.builder.append(self.idMetricMap[bean])
      else:
        self.metricIdMap[bean] = self.builder

  def endElement(self, tag):
    if tag == "bean":
      self.clazz = self.parentClazz
      if self.clazzQueue.empty():
        self.parentClazz = None
      else:
        self.parentClazz = self.clazzQueue.get_nowait()

if (__name__ == "__main__"):

  spmpath = '~/workspace/sematext/spm-master/spm-reports/src/main/resources/cr-report-config/report/'

  for (spmdirpath, spmdirnames, spmfilenames) in walk(spmpath):
    for spmdirname in spmdirnames:
      if spmdirname == "overview":
        continue
      projectpath = spmdirpath + '/' + spmdirname
  
      print spmdirname
      f = open('report-' + spmdirname +'.md', 'w')
      f.write('## ' + spmdirname + '\n\n')

      for (dirpath, dirnames, filenames) in walk(projectpath):
        for filename in filenames:
          parser = xml.sax.make_parser()
          parser.setFeature(xml.sax.handler.feature_namespaces, 0)

          handler = ReportHandler()
          parser.setContentHandler(handler)

          parser.parse(dirpath + '/' + filename)

          print filename
          f.write("### Report: " + handler.reportName + '\n\n')

          for id, chart in handler.charts.iteritems():
            print 'chartName', id, chart['chartName']

            f.write('#### Chart: ' + chart['chartName'] + '\n')
            f.write('Metric Name | Metric Description\n')
            f.write('--- | ---\n')

            reportBuilder = handler.builders[chart['reportBuilder']]

            for metric in reportBuilder:
              f.write(metric["label"])
              f.write(' | ' + ((' '.join(metric["legendTooltip"]).encode('utf-8').strip() if isinstance(metric["legendTooltip"], list) else metric["legendTooltip"].encode('utf-8').strip()) if metric.has_key("legendTooltip") else '') + '\n')

            f.write('\n')

          f.write('\n\n')
      f.close()