import { useMantineTheme, Group, rem, Text } from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import { get } from "http";
import { Upload } from "upload-js";

export default function Home() {
  const theme = useMantineTheme();
  const upload = Upload({
    apiKey: "public_12a1yDhFXdiwiqc5cp4roMGKbtde",
  });

  const onDrop = async (files: any[]): Promise<any> => {
    const { fileUrl } = await upload.uploadFile(files[0]);
    console.log(fileUrl);
  };

  return (
    <Dropzone
      onDrop={onDrop}
      onReject={(files) => console.log("rejected files", files)}
      accept={PDF_MIME_TYPE}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
