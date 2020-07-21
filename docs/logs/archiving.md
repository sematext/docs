title: Log Archiving
description: Archiving logs to an S3-compatible object store

You can configure a Logs App to forward all the logs it receives
to an S3-compatible object store.

### How do I configure archiving for my Logs App?

In Sematext web app, go to `Integrations > Apps` view
and choose `Configure S3` using row context menu (*three-dots* icon)
of the app whose logs you want to ship to S3:

For Amazon S3, all you have to provide are
[credentials](#how-to-obtain-credentials-from-AWS) and a bucket name:

![](attachments/6520901/aws-s3.png?effects=drop-shadow)

For any other S3-compatible object store you'll also have to provide
a service endpoint, which is usually specified in bucket configuration:

![](attachments/6520901/non-aws-s3.png?effects=drop-shadow)

Paste `Access key ID` and `Secret access key` to the corresponding
fields.

Enter `Bucket name` (just the simple name, not fully qualified ARN) and
choose `Compression` (read on for more details about compression) and
confirm with `Verify and save`.

At this point, Logs App is going to check whether the information is
valid using the AWS S3 API.

After the check is done you'll see a feedback message confirming
information validity or an error
message.

### How to obtain credentials from AWS?

For our Logs App AWS S3 Settings, besides S3 bucket name, you'll need
`Access Key ID` and `Secret Access Key`.

Log in to your AWS account, go to `IAM > Users` and open (or create) a
user that you want to use for S3 uploads:

![](attachments/6520901/75759631.png?effects=drop-shadow&height=250)

Click on `Create Access Key`:

![](attachments/6520901/75759633.png?effects=drop-shadow&height=250)

Note down `Access Key ID` and `Secret Access Key` (you can `Download
Credentials` to a safe place if you like, but it's not necessary).

### Which credentials are required when using AWS S3 Bucket Access Policy?

In order to verify access to your S3 bucket, Logs App will first use
the credentials to log in and, if successful, it will proceed to create
a dummy object inside the bucket.

If object creation was successful it will delete the object.

For those reasons, the following credentials must be given to the bucket
when saving AWS S3 settings:

  - `s3:GetObject`
  - `s3:PutObject`
  - `s3:DeleteObject`

After the verification is done you can
remove `s3:DeleteObject` permission from the bucket policy.

### How are logs compressed in S3?

You have the option of choosing between two modern, lossless
compression codecs from the [`LZ77` family](https://en.wikipedia.org/wiki/LZ77_and_LZ78), with excellent
speed/compression ratio, **`LZ4`** and **`LZF`**.

If you choose `No compression` option, logs will be stored in raw,
uncompressed format, as JSON files.

### How can I decompress logs archived in S3?

You can decompress by installing these command line programs (then
use` man lz4 `or` man lzf` for further instructions):

#### Ubuntu/Debian:

``` bash
sudo apt-get install liblz4-tool
sudo apt-get install libcompress-lzf-java (landed in Ubuntu 15.04)
```

#### OSX:

``` bash
brew install lz4
brew install liblzf
```

### Which folder structure your centralized logging management solution uses when uploading logs to S3?

Inside a bucket that you specify in settings, the following folder
hierarchy is created:

`sematext_[app-token-start]/[year]/[month]/[day]/[hour]`

Where `[app-token-start]` is the first sequence of app's token.

E.g. for app with token `f333a7d7-``ab55-4ce9-94a5-``cdb44a704740`,
folder will have the following path on `May 01, 2017 at 11:20PM UTC`:` `

`sematext_f333a7d7/2017/05/01/23/`



![(warning)](images/icons/emoticons/warning.png "(warning)") **Note:**

Before **May 01, 2017 **the folder hierarchy was more flat:

`/<tokenMD5HexHash>/logsene_<date>/<hour>`

For example: `856f4f9c3c084da08ec7ea9ad5d4cadf/logsene_2016-07-20/18`
