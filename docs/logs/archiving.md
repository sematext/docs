title: Archiving Logs in Sematext
description: Archiving logs to an S3-compatible object store for long-term and cheap storage

<div style="padding-top:40px;display:grid;grid-template-columns:150px 150px 150px 150px;grid-template-rows:100px 100px;">
  <a href="https://aws.amazon.com/s3" target="_blank" title="Amazon AWS S3">
    <img src="/docs/images/logs/archiving/aws-logo.png" style="height:80px;width:134px;margin-top:auto;">
  </a>
  <a href="https://www.digitalocean.com/products/spaces" target="_blank" title="Digital Ocean Spaces">
    <img src="/docs/images/logs/archiving/digital-ocean-logo.png" style="height:80px;width:80px;margin-top:auto;">
  </a>
  <a href="https://www.ibm.com/cloud/object-storage" target="_blank" title="IBM Cloud Object Storage">
    <img src="/docs/images/logs/archiving/ibm-logo.png" style="height:80px;width:90px;margin-top:auto;">
  </a>
  <a href="https://azure.microsoft.com/services/storage" target="_blank" title="Azure Cloud Storage">
    <img src="/docs/images/logs/archiving/azure-logo.png" style="height:80px;width:104px;margin-top:auto;">
  </a>
  <a href="https://cloud.google.com/storage" target="_blank" title="Google Cloud Storage" style="grid-column-start:2">
    <img src="/docs/images/logs/archiving/google-logo.png" style="height:80px;width:99px;margin-top:auto;">
  </a>
  <a href="https://min.io" target="_blank" title="MinIO Object Storage" style="align-self:center;">
    <img src="/docs/images/logs/archiving/minio-logo.png" style="height:30px;width:150px;margin-top:auto;">
  </a>
</div>

You can configure each Logs App to compress and store all logs it receives to an S3-compatible object store. This includes:

- [AWS S3](https://aws.amazon.com/s3/)
- [Microsoft Azure Storage](https://azure.microsoft.com/services/storage/)
- [Google Cloud Storage](https://cloud.google.com/storage)
- [IBM Cloud Object Storage](https://www.ibm.com/cloud/storage)
- [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces/)
- [Minio](http://minio.io/)
- ...

## How to Configure Log Archiving

In Sematext, go to `Logs` view and choose `Archive Logs` in the App context
menu (*three-dots* icon) of the App whose logs you want to ship to an
S3-compatible object store:

For Amazon S3, all you have to provide are
[credentials](#how-to-obtain-credentials-from-aws) and a bucket name:

<img src="/docs/images/logs/archiving/aws-s3.png" style="height:400px;width:482px">

For any other S3-compatible object store you'll also have to provide
a service endpoint. Cloud object store providers, like *DigitalOcean
Spaces* or *IBM Cloud Object Storage* usually refer to it as a 
`Public Service Endpoint` in bucket configuration. For Minio users
this would be your Minio public URL.  

<img src="/docs/images/logs/archiving/non-aws-s3.png" style="height:477px;width:490px;">

Paste `Access key ID` and `Secret access key` in the corresponding
fields.

Enter `Bucket name` (just the simple name, not fully qualified ARN) and
choose `Compression` (read on for more details about compression) and
confirm with `Verify and save`.

At this point, your Logs App is going to check whether the information is
valid using the AWS S3 API.

After the check is done you'll see a feedback message confirming
information validity or an error message.

## How to Obtain Credentials from AWS

For our Logs App AWS S3 Settings, besides S3 bucket name, you'll need
`Access Key ID` and `Secret Access Key`.

Log in to your AWS account, go to `IAM > Users` and open (or create) a
user that you want to use for S3 uploads:

![](/docs/images/logs/archiving/create-access-key.png?effects=drop-shadow&height=250)

Click on `Create Access Key`:

![](/docs/images/logs/archiving/new-access-key.png?effects=drop-shadow&height=250)

Note down `Access Key ID` and `Secret Access Key` (you can `Download
Credentials` to a safe place if you like, but it's not necessary).

## Credentials Required When Using the AWS S3 Bucket Access Policy

In order to verify access to your S3 bucket, the Logs App will first use
the credentials to log in and, if successful, proceed to create
a dummy file inside the bucket.

If the file creation was successful Logs App will attempt to delete it.

For these reasons, the following credentials must be given to the bucket
when saving AWS S3 settings:

  - `s3:GetObject`
  - `s3:PutObject`
  - `s3:DeleteObject`

After the verification is done you can remove the `s3:DeleteObject`
permission from the bucket policy.

**NOTE:** if deletion of the dummy object fails the Logs App will
ignore it and conclude that it can start shipping logs.

## Compression of Archived Logs

You have the option of choosing between two modern, lossless
compression codecs from the [`LZ77` family](https://en.wikipedia.org/wiki/LZ77_and_LZ78), with excellent
speed/compression ratio, **`LZ4`** and **`LZF`**.

If you choose `No compression` option, logs will be stored in raw,
uncompressed format, as JSON files.

## Decompressing Archived Logs

You can decompress logs by installing these command line programs (then use` man lz4 `or` man lzf` for further instructions):

### Ubuntu/Debian

``` bash
sudo apt-get install liblz4-tool
sudo apt-get install libcompress-lzf-java (landed in Ubuntu 15.04)
```

### OSX

``` bash
brew install lz4
brew install liblzf
```

## Folder Structure Used for Logs Archived in S3

Inside a bucket that you specify in settings, the following folder hierarchy is created:

`sematext_[app-token-start]/[year]/[month]/[day]/[hour]`

Where `[app-token-start]` is the first sequence of your Logs App's token.

For example, an App whose token begins with `f333a7d7` will have a folder with the
following path on `May 01, 2021 at 11:20PM UTC`:

`sematext_f333a7d7/2021/05/01/23/`



<img src="/docs/images/warning.png?effects=drop-shadow" alt="warning"  style="display: inline-block;" /> **Note:**

Before **May 01, 2017 **the folder hierarchy was more flat:

`/<tokenMD5HexHash>/logsene_<date>/<hour>`

For example: `856f4f9c3c084da08ec7ea9ad5d4cadf/logsene_2016-07-20/18`
