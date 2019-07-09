Aside from collecting a plethora of container operational metrics, Sematext Agent also gathers container and image metadata to enrich metrics/logs with additional context that might be useful to narrow down issues during troubleshooting.

## Image metadata

| Name           | Description |
| ---------------|-------------|
| name           | Represents the name of the container image |
| version        | The current version of the container image |   
| size           | The size of the image in bytes |
| creation time  | The instant in time the image was built |


## Container metadata

| Name           | Description |
| ---------------|-------------|
| type           | Designates the container runtime |
| id             | Is the unique container identifier |   
| pid            | Represents the identifier of the main process inside container |
| image          | Is the image name that was used to spin up the container |
| started        | Represents container startup time |
| networks       | All networks that container is attached to |
| volumes        | A list of volumes bound to the container   |
| labels         | Is the collection of container labels that are also shipped as [tag aliases](../../../monitoring/tag-aliases-support.md) |
