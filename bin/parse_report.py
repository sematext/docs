#!/user/bin/python

import uuid
import re
from os import walk
import xml.sax
import Queue

class AggHandler(xml.sax.ContentHandler):
  def __init__(self):
    self.metrics = {}

  def startElement(self, tag, attributes):
    if tag == "metric":
      self.metrics[attributes["name"]] = attributes["factoryClassName"]

class ReportHandler(xml.sax.ContentHandler):
  def __init__(self):
    self.clazz = None
    self.metric = None
    self.metrics = {}

  def startElement(self, tag, attributes):
    if tag == "bean":
      self.clazz = attributes["class"]
      if self.clazz == "com.sematext.af.report.af.report.AFDataSeriesDescription" or self.clazz == "com.sematext.af.report.af.report.AFComplexDataSeriesDescription":
        self.metric = {}
    elif tag == "property":
      name = attributes["name"]
      if self.clazz == "com.sematext.af.report.af.report.AFDataSeriesDescription" or self.clazz == "com.sematext.af.report.af.report.AFComplexDataSeriesDescription":
        if name == "metricName" or name == "label" or name == "key" or name == "legendTooltip":
          self.metric[name] = attributes["value"]

  def endElement(self, tag):
    if tag == "bean":
      if self.clazz == "com.sematext.af.report.af.report.AFDataSeriesDescription" or self.clazz == "com.sematext.af.report.af.report.AFComplexDataSeriesDescription":
        if self.metric.has_key("metricName"):
          self.metrics[self.metric["metricName"]] = self.metric
        self.metric = None
      self.clazz = None

if (__name__ == "__main__"):

  aggParser = xml.sax.make_parser()
  aggParser.setFeature(xml.sax.handler.feature_namespaces, 0)

  aggHandler = AggHandler()
  aggParser.setContentHandler(aggHandler)

  aggFile = "/home/user/workspace/sematext/config-master/current-prod-release/spm/afs/aggPlanTemplate.xml"
  aggParser.parse(aggFile)

  spmpath = '/home/user/workspace/sematext/spm-master/spm-reports/src/main/resources/cr-report-config/report/'

  for (spmdirpath, spmdirnames, spmfilenames) in walk(spmpath):
    for spmdirname in spmdirnames:
      if spmdirname == "overview":
        continue
      projectpath = spmdirpath + '/' + spmdirname
  
      print spmdirname
      f = open(spmdirname +'.md', 'w')
      f.write('Metric Name | Key | Agg | Type | Description\n')
      f.write('--- | --- | --- | --- | ---\n')
      
      for (dirpath, dirnames, filenames) in walk(projectpath):
        for filename in filenames:
          parser = xml.sax.make_parser()
          parser.setFeature(xml.sax.handler.feature_namespaces, 0)

          handler = ReportHandler()
          parser.setContentHandler(handler)

          parser.parse(dirpath + '/' + filename)

          print filename

          for metricName, metric in handler.metrics.iteritems():
            if (not metric.has_key("key")):
              continue
            f.write(metric["label"] + ' | ' + metric["key"] + ' | ')
            if aggHandler.metrics.has_key(metric["metricName"]):
              factoryClassName = aggHandler.metrics[metric["metricName"]]
              strs = re.findall('[A-Z][a-z]*', factoryClassName)
              f.write(strs[0] + ' | ' + strs[1])
            else:
              f.write('| |')
            f.write(' | ' + ((' '.join(metric["legendTooltip"]).encode('utf-8').strip() if isinstance(metric["legendTooltip"], list) else metric["legendTooltip"].encode('utf-8').strip()) if metric.has_key("legendTooltip") else '') + '\n')
      f.close()