import {
  useMantineTheme,
  rem,
  Text,
  Textarea,
  LoadingOverlay,
  Group,
  Box,
} from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";
import { Upload } from "upload-js";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Table } from '@mantine/core';

export default function Home() {
  const theme = useMantineTheme();

  const [summary, setSummary] = useState("");
  const [visible, { open, close }] = useDisclosure(false);

  const upload = Upload({
    apiKey: "public_12a1yDhFXdiwiqc5cp4roMGKbtde",
  });

  const onDrop = async (files: any[]): Promise<any> => {
    open();
    const { fileUrl } = await upload.uploadFile(files[0]);
    await uploadComplete(fileUrl);
  };

  const uploadComplete = async (fileUrl: string) => {
    var response = await axios.post("api/summary", {
      url: fileUrl,
    });
    console.log(response);
    close();
    setSummary(response.data.text);
  };

  return (
    <>
      <Box pos="relative">
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
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>

        <Textarea
          placeholder="Summary"
          label="Results"
          variant="filled"
          radius="md"
          size="md"
          readOnly={true}
          value={summary}
        />
        <LoadingOverlay visible={visible} overlayBlur={2} />
      </Box>
    </>
  );
}
