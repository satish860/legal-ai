import { JudgmentsRecord } from "@/types";
import { getXataClient } from "@/xata";
import { Table } from "@mantine/core";
import { GetStaticProps } from "next";

interface HomeProps {
  judgements: JudgmentsRecord[];
}

export default function Home(props: HomeProps) {
  const rows = props.judgements.map((element) => (
    <tr key={element.CaseNumber}>
        <td>{element.CaseNumber}</td>
      <td>{element.JudgementNo}</td>
      <td>
        <a href={element.Url?.toString()}>{element.Url}</a>
    </td>
      <td>{element.Summary}</td>
    </tr>
  ));
  console.log(props.judgements);
  return (
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
