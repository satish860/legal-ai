import { getXataClient,JudgmentsRecord } from "@/xata";
import { Table, Button } from "@mantine/core";
import { GetStaticProps, } from "next";
import Link from "next/link"
import { AiOutlineFilePdf } from "react-icons/ai";

interface HomeProps {
  judgements: JudgmentsRecord[]
}

export default function Home(props: HomeProps) {
  const rows = props.judgements.map((element) => (
    <tr key={element.CaseNumber}>
      <td>{element.CaseNumber}</td>
      <td>{element.JudgementNo}</td>
      <td>
        <a href={element.Url?.toString()}>
          <AiOutlineFilePdf />
        </a>
      </td>
      <td>{element.Summary}</td>
    </tr>
  ));
  console.log(props.judgements);
  return (
    <>
      <Link
        href="/summary"
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
        >
          Upload a Document
        </Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Case Number </th>
            <th>Judgement Number </th>
            <th>FIle URL</th>
            <th>Case Summary</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const xata = getXataClient();
  const page = await xata.db.judgments.getPaginated({
    pagination: {
      size: 15,
    },
  });
  return { props: { judgements: page.records } };
};
