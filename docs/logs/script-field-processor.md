title: Script Field Processor
description: Logs Pipeline Processors

Scripting is supported using the Script processor. It uses [painless](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-guide.html), a simple scripting language similar to Java. 
You can access fields using the `doc` method. Since the field value can be of any type, before using it you must cast the value to a specific type like: String, Integer, Double, etc.

The following is supported:

- Math operators: +, -, /, *, %, ^, e.g. `((Integer)doc['size.kb']).intValue()*2`
- Relational operators: ==, !=, <, <=, >, >=, e.g. `((Integer)doc['size']).intValue() > 10`
- Logical operators: &&, ||, !, e.g. `((Integer)doc['size']).intValue() > -1 && ((Integer)doc['size']).intValue() < 10`
- Ternary operator, e.g. `((Integer)doc['speed']).intValue() < 1000 ? "OK" : "SLOW"`
- String functions, e.g. `((String)doc['severity']).toUpperCase()` or `((String)doc['message']).splitOnToken('-')[3]`

Conditional block and loops are supported. The last line should result in a value that will then be stored as a field.  Here is a made up example:

```java
String[] tokens = ((String)doc['message']).splitOnToken(' '); 
if(tokens.length % 2 != 0){
  String result = "Iterator ";
  for(int i = 0; i < tokens.length; i++){
      result += i;
  }
  result;
}
else {
  tokens.length * 10;
}
```

Imagine we have a message field:
`Got document of 142 kb from 255.35.244.0`
and that we want to extract the number of kilobytes. The script might look something like:

```java
int kbIdx = ((String)doc['message']).indexOf(' kb');
((String)doc['message']).substring(17, kbIdx)
```
