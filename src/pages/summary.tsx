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
import React, { useState } from "react";

export default function Home() {
  const theme = useMantineTheme();

  const [summaries, setSummaries] = useState<string[]>([]);

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
    const pageContents = response.data.docs.map(
      (p: { pageContent: any }) => p.pageContent
    );
    const newSummaries = await uploadpageContent(pageContents);
    close();
    setSummaries(newSummaries);
  };

  const uploadpageContent = async (pageContent: any) => {
    const summaries = [];
    for (let i = 0; i < pageContent.length; i++) {
      var summary = await axios.post("api/map", {
        text: pageContent[i],
      });
      console.log(summary.data.summary);
      summaries.push(summary.data.summary);
    }
    return summaries;
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

        <ul>
          {summaries.map((summary, index) => (
            <li key={index}>{summary}</li>
          ))}
        </ul>
        <LoadingOverlay visible={visible} overlayBlur={2} />
      </Box>
    </>
  );
}
