title: Welcome to Sematext Docs!
description: Private on-premises and cloud SaaS infrastructure & application performance monitoring, log management & hosted ELK stack, Docker metrics and logs, events and alerts, and much, much more...

Welcome to Sematext, a full-stack observability tool where you can combine metrics and logs, with custom alerts, in any way you want! Have everything in one place.

_If you’re new here, read below for a high-level overview of Sematext._

<div class="mdl-grid" style="padding:0;margin:-8px;">
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/logs/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp logs-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Logs
					</h4>
					<p>Hassle-free log monitoring & analysis</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/monitoring/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp monitoring-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Monitoring
					</h4>
					<p>Map and monitor your whole infrastructure in real-time</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/experience/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp experience-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Experience
					</h4>
					<p>Frontend performance and user experience monitoring</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/synthetics/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp synthetics-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Synthetics
					</h4>
					<p>Monitor APIs, websites and user journeys</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/alerts/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp alerts-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Alerts
					</h4>
					<p>Get notified via Slack, PagerDuty, WebHooks, email, etc.</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/events/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp events-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Events
					</h4>
					<p>Capture builds, deployments, restarts, failures and other key events</p>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="/docs/tracing/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp tracing-card">
				<div class="mdl-card__title mdl-card--expand custom-mdl-card">
					<h4>
						Tracing
					</h4>
					<p>End to end visibility into your distributed applications</p>
				</div>
			</div>
		</a>
	</div>
</div>


## How Sematext works
Sematext integrations let you collect metrics, logs and events across your whole stack. Our solution goes beyond collecting metrics and detects anomalies, uncovers your slowest transactions, communication between servers and applications.

We include a fully integrated Kibana and expose an Elasticsearch API. Sematext works with all standard log shippers and agents you're already used to, such as syslog, Logstash, Fluentd, Flume, nxlog, Filebeat, and many others, and integrates in minutes.

With Experience you can detect anomalies in real time and receive alerts when end-user experience is affected by website performance. Sematext Experience provides invaluable insights that keep your business in control of how happy your customers are when interacting with your website or webapp.

Since Sematext Cloud is an all-in-one Performance Monitoring, Log Management, and Real-User Monitoring solution, our documentation is split several sections labeled Monitoring, Logs, Experience, Alerts, Events, and Tracing. There is a separate section dedicated to Sematext Enterprise which is Sematext Cloud for deployment on your own infrastructure.

Data shipped to Sematext is grouped into Apps. App integrations are ways to monitor, collect logs, and other data from numerous different types of software and tools.


## Integrations
Sematext provides over 40 built-in integrations used to monitor your systems, applications, and services.

<div class="mdl-cell--12-col">
	<div class="demo-card-event mdl-card mdl-shadow--2dp">
		<div class="mdl-card__title mdl-card--expand">
			<ul class="demo-list-icon mdl-list integrations-card-list">
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/solr/">
							<img src="/docs/images/integrations/solr.svg" alt="Solr" title="Apache Solr">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/elasticsearch/">
							<img src="/docs/images/integrations/elasticsearch.svg" style="width:36px; height:36px;" alt="Elasticsearch" title="Elasticsearch">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/docker/">
							<img src="/docs/images/integrations/docker.svg" alt="Docker" title="Docker">
						</a>
					</span>
				</li>
			</ul>
			<ul class="demo-list-icon mdl-list integrations-card-list">
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/akka/">
							<img src="/docs/images/integrations/akka.svg" alt="Akka" title="Akka">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/aws/">
							<img src="/docs/images/integrations/aws.svg" alt="AWS" style="min-width: 72px;" title="AWS - Amazon Web Services">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/nginx/">
							<img src="/docs/images/integrations/nginx.svg" alt="Nginx" title="Nginx">
						</a>
					</span>
				</li>
			</ul>
			<ul class="demo-list-icon mdl-list integrations-card-list">
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/cassandra/">
							<img src="/docs/images/integrations/cassandra.svg" alt="Cassandra" title="Cassandra">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/apache/">
							<img src="/docs/images/integrations/apache.svg" alt="Apache" title="Apache" style="height: 48px;">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/tomcat/">
							<img src="/docs/images/integrations/tomcat.svg" alt="Tomcat" title="Tomcat">
						</a>
					</span>
				</li>
			</ul>
			<ul class="demo-list-icon mdl-list integrations-card-list">
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/node.js/">
							<img src="/docs/images/integrations/nodejs-icon.svg" alt="Node.js" title="Node.js">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/hbase/">
							<img src="/docs/images/integrations/hbase.svg" alt="HBase" title="HBase">
						</a>
					</span>
				</li>
				<li class="mdl-list__item">
					<span class="mdl-list__item-primary-content">
						<a href="/docs/integration/hadoop/">
							<img src="/docs/images/integrations/hadoop.svg" alt="Hadoop" title="Hadoop">
						</a>
					</span>
				</li>
			</ul>
			<ul class="demo-list-icon mdl-list integrations-card-list">
					<li class="mdl-list__item">
						<span class="mdl-list__item-primary-content">
							<a href="/docs/integration/kafka/">
								<img src="/docs/images/integrations/kafka.svg" alt="Kafka" style="height: 48px;" title="Kafka">
							</a>
						</span>
					</li>
					<li class="mdl-list__item">
						<span class="mdl-list__item-primary-content">
							<a href="/docs/integration/php/">
								<img src="/docs/images/integrations/php.svg" alt="PHP" title="PHP">
							</a>
						</span>
					</li>
					<li class="mdl-list__item">
						<span class="mdl-list__item-primary-content">
							<a href="/docs/integration/jvm/">
								<img src="/docs/images/integrations/java.svg" alt="Java JVM" title="Java JVM">
							</a>
						</span>
					</li>
				</ul>
		</div>
		<h4>
			<a href="/docs/integration/" style="padding-right:8%; float:right;">See all integrations...</a>
		</h4>
	</div>
</div>

We also provide you with easy to install Agents that collect data about your software and send it to Sematext.

<div class="mdl-grid" style="padding:0;margin:0 -8px;">
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./logagent/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp logagent-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Logagent
					</h4>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./agents/sematext-agent/containers/installation/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp docker-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Docker Agent
					</h4>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./agents/sematext-agent/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp kubernetes-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Sematext Agent
					</h4>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./agents/node-agent/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp monitoring-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Node.js Agent
					</h4>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./agents/browser/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp browser-sdk-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Browser SDK
					</h4>
				</div>
			</div>
		</a>
	</div>
	<div class="mdl-cell mdl-cell--4-col">
		<a href="./agents/mobile/">
			<div class="demo-card-event mdl-card mdl-shadow--2dp mobile-sdk-card">
				<div class="mdl-card__title mdl-card--expand">
					<h4>
						Mobile SDK
					</h4>
				</div>
			</div>
		</a>
	</div>
</div>

But, also an open [API](/api/) you can use.

---

If you have questions, we’re here to help. Don’t hesitate to contact us at [support@sematext.com](mailto:support@sematext.com).


<!-- Comment out outdated video / reuse code for video embeds
<div class="video_container">
<iframe class="video" src="https://www.youtube.com/embed/fY-j6g_oTmA" frameborder="0" allowfullscreen=""></iframe>
</div>
-->
