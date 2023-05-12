import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "judgments";
    readonly columns: readonly [
      {
        readonly name: "JudgementNo";
        readonly type: "string";
      },
      {
        readonly name: "Url";
        readonly type: "string";
      },
      {
        readonly name: "CaseNumber";
        readonly type: "string";
      },
      {
        readonly name: "Summary";
        readonly type: "text";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Judgments = InferredTypes["judgments"];
export type JudgmentsRecord = Judgments & XataRecord;
export type DatabaseSchema = {
  judgments: JudgmentsRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
