import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "event";
    readonly columns: readonly [
      {
        readonly name: "course";
        readonly type: "link";
        readonly link: {
          readonly table: "course";
        };
      },
      {
        readonly name: "host";
        readonly type: "link";
        readonly link: {
          readonly table: "host";
        };
      },
      {
        readonly name: "classroom";
        readonly type: "link";
        readonly link: {
          readonly table: "classroom";
        };
      },
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "start";
        readonly type: "datetime";
      },
      {
        readonly name: "end";
        readonly type: "datetime";
      }
    ];
  },
  {
    readonly name: "classroom";
    readonly columns: readonly [
      {
        readonly name: "max";
        readonly type: "int";
        readonly notNull: true;
        readonly defaultValue: "0";
      },
      {
        readonly name: "name";
        readonly type: "string";
        readonly unique: true;
      },
      {
        readonly name: "code";
        readonly type: "int";
        readonly unique: true;
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "classroom";
        readonly table: "event";
      }
    ];
  },
  {
    readonly name: "host";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
        readonly notNull: true;
        readonly defaultValue: "error";
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "host";
        readonly table: "event";
      }
    ];
  },
  {
    readonly name: "course";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
        readonly defaultValue: "error";
      },
      {
        readonly name: "code";
        readonly type: "string";
        readonly unique: true;
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "course";
        readonly table: "event";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Event = InferredTypes["event"];
export type EventRecord = Event & XataRecord;
export type Classroom = InferredTypes["classroom"];
export type ClassroomRecord = Classroom & XataRecord;
export type Host = InferredTypes["host"];
export type HostRecord = Host & XataRecord;
export type Course = InferredTypes["course"];
export type CourseRecord = Course & XataRecord;
export type DatabaseSchema = {
  event: EventRecord;
  classroom: ClassroomRecord;
  host: HostRecord;
  course: CourseRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
