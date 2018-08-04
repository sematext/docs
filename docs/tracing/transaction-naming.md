title: Transaction Naming
description: Java tracing agent uses method signature of entry point as the transaction name when naming web transactions inside Sematext infrastructure and app monitoring tools  

To name web transactions (i.e., transactions triggered by an HTTP
request) the SPM Java tracing agent uses method signature of entry point
as the transaction name. Entry point methods can be last filter/servlet
executed in a chain, or a Spring handler method name (i.e., a method
name with the \`@RequestHandler\` annotation). Alternatively,
transaction names can be redefined using servlet config.  For example,
here we name them "WorkerTransaction":

``` xml
<servlet>
  <servlet-name>WorkerServlet</servlet-name>
  <servlet-class>phi.WorkerServlet</servlet-class>
  <init-param>
    <param-name>com.sematext.spm.tracing.agent.TRANSACTION_NAME</param-name>
    <param-value>WorkerTransaction</param-value>
  </init-param>
</servlet> 
```

Precedence rules for resolving transaction names:

<table>
<thead>
<tr class="header">
<th>Precedence</th>
<th>Naming</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>3</td>
<td>Servlet config parameter</td>
</tr>
<tr class="even">
<td>2</td>
<td>Spring handler</td>
</tr>
<tr class="odd">
<td>1</td>
<td>Servlet/Filter</td>
</tr>
</tbody>
</table>

Non-web transactions can be (re)named using the transaction-name
attribute as described in [Custom Pointcuts](custom-pointcuts).
