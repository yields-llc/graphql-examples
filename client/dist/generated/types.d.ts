export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
    BigInt: {
        input: any;
        output: any;
    };
    /** The `Byte` scalar type represents byte value as a Buffer */
    Bytes: {
        input: any;
        output: any;
    };
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: {
        input: any;
        output: any;
    };
    /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
    Decimal: {
        input: any;
        output: any;
    };
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    Json: {
        input: any;
        output: any;
    };
};
export type BigIntFilter = {
    equals?: InputMaybe<Scalars['BigInt']['input']>;
    gt?: InputMaybe<Scalars['BigInt']['input']>;
    gte?: InputMaybe<Scalars['BigInt']['input']>;
    in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
    is?: InputMaybe<Scalars['BigInt']['input']>;
    isNot?: InputMaybe<Scalars['BigInt']['input']>;
    lt?: InputMaybe<Scalars['BigInt']['input']>;
    lte?: InputMaybe<Scalars['BigInt']['input']>;
    not?: InputMaybe<BigIntFilter>;
    notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};
export type DateTimeFilter = {
    equals?: InputMaybe<Scalars['DateTime']['input']>;
    gt?: InputMaybe<Scalars['DateTime']['input']>;
    gte?: InputMaybe<Scalars['DateTime']['input']>;
    in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
    is?: InputMaybe<Scalars['DateTime']['input']>;
    isNot?: InputMaybe<Scalars['DateTime']['input']>;
    lt?: InputMaybe<Scalars['DateTime']['input']>;
    lte?: InputMaybe<Scalars['DateTime']['input']>;
    not?: InputMaybe<DateTimeFilter>;
    notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};
export type JsonFilter = {
    equals?: InputMaybe<Scalars['Json']['input']>;
    in?: InputMaybe<Array<Scalars['Json']['input']>>;
    is?: InputMaybe<Scalars['Json']['input']>;
    isNot?: InputMaybe<Scalars['Json']['input']>;
    not?: InputMaybe<JsonFilter>;
    notIn?: InputMaybe<Array<Scalars['Json']['input']>>;
};
export type Mutation = {
    __typename?: 'Mutation';
    updateProject?: Maybe<Projects>;
};
export type MutationUpdateProjectArgs = {
    description?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['Int']['input']>;
};
export declare enum OrderBy {
    Asc = "Asc",
    Desc = "Desc"
}
export type Query = {
    __typename?: 'Query';
    listProjects?: Maybe<Array<Projects>>;
};
export type StringFilter = {
    contains?: InputMaybe<Scalars['String']['input']>;
    endsWith?: InputMaybe<Scalars['String']['input']>;
    equals?: InputMaybe<Scalars['String']['input']>;
    gt?: InputMaybe<Scalars['String']['input']>;
    gte?: InputMaybe<Scalars['String']['input']>;
    in?: InputMaybe<Array<Scalars['String']['input']>>;
    is?: InputMaybe<Scalars['String']['input']>;
    isNot?: InputMaybe<Scalars['String']['input']>;
    lt?: InputMaybe<Scalars['String']['input']>;
    lte?: InputMaybe<Scalars['String']['input']>;
    not?: InputMaybe<StringFilter>;
    notIn?: InputMaybe<Array<Scalars['String']['input']>>;
    startsWith?: InputMaybe<Scalars['String']['input']>;
};
export type Activity_Logs = {
    __typename?: 'activity_logs';
    action: Scalars['String']['output'];
    created_at: Scalars['DateTime']['output'];
    details: Scalars['Json']['output'];
    id: Scalars['ID']['output'];
    user: Users;
    user_id: Scalars['BigInt']['output'];
};
export type Activity_LogsFilter = {
    action?: InputMaybe<StringFilter>;
    created_at?: InputMaybe<DateTimeFilter>;
    details?: InputMaybe<JsonFilter>;
    id?: InputMaybe<BigIntFilter>;
    user?: InputMaybe<UsersFilter>;
    user_id?: InputMaybe<BigIntFilter>;
};
export type Activity_LogsListFilter = {
    every?: InputMaybe<Activity_LogsFilter>;
    none?: InputMaybe<Activity_LogsFilter>;
    some?: InputMaybe<Activity_LogsFilter>;
};
export type Activity_LogsOrderBy = {
    action?: InputMaybe<OrderBy>;
    created_at?: InputMaybe<OrderBy>;
    details?: InputMaybe<OrderBy>;
    id?: InputMaybe<OrderBy>;
    user?: InputMaybe<UsersOrderBy>;
    user_id?: InputMaybe<OrderBy>;
};
export type Comments = {
    __typename?: 'comments';
    content: Scalars['String']['output'];
    created_at: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    project?: Maybe<Projects>;
    project_id?: Maybe<Scalars['BigInt']['output']>;
    task?: Maybe<Tasks>;
    task_id?: Maybe<Scalars['BigInt']['output']>;
    user: Users;
    user_id: Scalars['BigInt']['output'];
};
export type CommentsFilter = {
    content?: InputMaybe<StringFilter>;
    created_at?: InputMaybe<DateTimeFilter>;
    id?: InputMaybe<BigIntFilter>;
    project?: InputMaybe<ProjectsFilter>;
    project_id?: InputMaybe<BigIntFilter>;
    task?: InputMaybe<TasksFilter>;
    task_id?: InputMaybe<BigIntFilter>;
    user?: InputMaybe<UsersFilter>;
    user_id?: InputMaybe<BigIntFilter>;
};
export type CommentsListFilter = {
    every?: InputMaybe<CommentsFilter>;
    none?: InputMaybe<CommentsFilter>;
    some?: InputMaybe<CommentsFilter>;
};
export type CommentsOrderBy = {
    content?: InputMaybe<OrderBy>;
    created_at?: InputMaybe<OrderBy>;
    id?: InputMaybe<OrderBy>;
    project?: InputMaybe<ProjectsOrderBy>;
    project_id?: InputMaybe<OrderBy>;
    task?: InputMaybe<TasksOrderBy>;
    task_id?: InputMaybe<OrderBy>;
    user?: InputMaybe<UsersOrderBy>;
    user_id?: InputMaybe<OrderBy>;
};
export type Projects = {
    __typename?: 'projects';
    comments: Array<Comments>;
    commentsCount: Scalars['Int']['output'];
    created_at: Scalars['DateTime']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    owner: Users;
    owner_id: Scalars['BigInt']['output'];
    tasks: Array<Tasks>;
    tasksCount: Scalars['Int']['output'];
    updated_at: Scalars['DateTime']['output'];
};
export type ProjectsCommentsArgs = {
    filter?: InputMaybe<CommentsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<CommentsOrderBy>>;
};
export type ProjectsCommentsCountArgs = {
    filter?: InputMaybe<CommentsFilter>;
};
export type ProjectsTasksArgs = {
    filter?: InputMaybe<TasksFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<TasksOrderBy>>;
};
export type ProjectsTasksCountArgs = {
    filter?: InputMaybe<TasksFilter>;
};
export type ProjectsFilter = {
    comments?: InputMaybe<CommentsListFilter>;
    created_at?: InputMaybe<DateTimeFilter>;
    description?: InputMaybe<StringFilter>;
    id?: InputMaybe<BigIntFilter>;
    name?: InputMaybe<StringFilter>;
    owner?: InputMaybe<UsersFilter>;
    owner_id?: InputMaybe<BigIntFilter>;
    tasks?: InputMaybe<TasksListFilter>;
    updated_at?: InputMaybe<DateTimeFilter>;
};
export type ProjectsListFilter = {
    every?: InputMaybe<ProjectsFilter>;
    none?: InputMaybe<ProjectsFilter>;
    some?: InputMaybe<ProjectsFilter>;
};
export type ProjectsOrderBy = {
    comments?: InputMaybe<CommentsOrderBy>;
    created_at?: InputMaybe<OrderBy>;
    description?: InputMaybe<OrderBy>;
    id?: InputMaybe<OrderBy>;
    name?: InputMaybe<OrderBy>;
    owner?: InputMaybe<UsersOrderBy>;
    owner_id?: InputMaybe<OrderBy>;
    tasks?: InputMaybe<TasksOrderBy>;
    updated_at?: InputMaybe<OrderBy>;
};
export type Tags = {
    __typename?: 'tags';
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    taskTags: Array<Task_Tags>;
    taskTagsCount: Scalars['Int']['output'];
};
export type TagsTaskTagsArgs = {
    filter?: InputMaybe<Task_TagsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<Task_TagsOrderBy>>;
};
export type TagsTaskTagsCountArgs = {
    filter?: InputMaybe<Task_TagsFilter>;
};
export type TagsFilter = {
    id?: InputMaybe<BigIntFilter>;
    name?: InputMaybe<StringFilter>;
    taskTags?: InputMaybe<Task_TagsListFilter>;
};
export type TagsOrderBy = {
    id?: InputMaybe<OrderBy>;
    name?: InputMaybe<OrderBy>;
    taskTags?: InputMaybe<Task_TagsOrderBy>;
};
export type Task_Tags = {
    __typename?: 'task_tags';
    id: Scalars['ID']['output'];
    tag: Tags;
    tag_id: Scalars['BigInt']['output'];
    task: Tasks;
    task_id: Scalars['BigInt']['output'];
};
export type Task_TagsFilter = {
    id?: InputMaybe<BigIntFilter>;
    tag?: InputMaybe<TagsFilter>;
    tag_id?: InputMaybe<BigIntFilter>;
    task?: InputMaybe<TasksFilter>;
    task_id?: InputMaybe<BigIntFilter>;
};
export type Task_TagsListFilter = {
    every?: InputMaybe<Task_TagsFilter>;
    none?: InputMaybe<Task_TagsFilter>;
    some?: InputMaybe<Task_TagsFilter>;
};
export type Task_TagsOrderBy = {
    id?: InputMaybe<OrderBy>;
    tag?: InputMaybe<TagsOrderBy>;
    tag_id?: InputMaybe<OrderBy>;
    task?: InputMaybe<TasksOrderBy>;
    task_id?: InputMaybe<OrderBy>;
};
export type Tasks = {
    __typename?: 'tasks';
    assignee?: Maybe<Users>;
    assignee_id?: Maybe<Scalars['BigInt']['output']>;
    comments: Array<Comments>;
    commentsCount: Scalars['Int']['output'];
    created_at: Scalars['DateTime']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['ID']['output'];
    project: Projects;
    project_id: Scalars['BigInt']['output'];
    status: Scalars['String']['output'];
    tags: Array<Task_Tags>;
    tagsCount: Scalars['Int']['output'];
    title: Scalars['String']['output'];
    updated_at: Scalars['DateTime']['output'];
};
export type TasksCommentsArgs = {
    filter?: InputMaybe<CommentsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<CommentsOrderBy>>;
};
export type TasksCommentsCountArgs = {
    filter?: InputMaybe<CommentsFilter>;
};
export type TasksTagsArgs = {
    filter?: InputMaybe<Task_TagsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<Task_TagsOrderBy>>;
};
export type TasksTagsCountArgs = {
    filter?: InputMaybe<Task_TagsFilter>;
};
export type TasksFilter = {
    assignee?: InputMaybe<UsersFilter>;
    assignee_id?: InputMaybe<BigIntFilter>;
    comments?: InputMaybe<CommentsListFilter>;
    created_at?: InputMaybe<DateTimeFilter>;
    description?: InputMaybe<StringFilter>;
    id?: InputMaybe<BigIntFilter>;
    project?: InputMaybe<ProjectsFilter>;
    project_id?: InputMaybe<BigIntFilter>;
    status?: InputMaybe<StringFilter>;
    tags?: InputMaybe<Task_TagsListFilter>;
    title?: InputMaybe<StringFilter>;
    updated_at?: InputMaybe<DateTimeFilter>;
};
export type TasksListFilter = {
    every?: InputMaybe<TasksFilter>;
    none?: InputMaybe<TasksFilter>;
    some?: InputMaybe<TasksFilter>;
};
export type TasksOrderBy = {
    assignee?: InputMaybe<UsersOrderBy>;
    assignee_id?: InputMaybe<OrderBy>;
    comments?: InputMaybe<CommentsOrderBy>;
    created_at?: InputMaybe<OrderBy>;
    description?: InputMaybe<OrderBy>;
    id?: InputMaybe<OrderBy>;
    project?: InputMaybe<ProjectsOrderBy>;
    project_id?: InputMaybe<OrderBy>;
    status?: InputMaybe<OrderBy>;
    tags?: InputMaybe<Task_TagsOrderBy>;
    title?: InputMaybe<OrderBy>;
    updated_at?: InputMaybe<OrderBy>;
};
export type Users = {
    __typename?: 'users';
    activity_logs: Array<Activity_Logs>;
    activity_logsCount: Scalars['Int']['output'];
    comments: Array<Comments>;
    commentsCount: Scalars['Int']['output'];
    created_at: Scalars['DateTime']['output'];
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    password_hash: Scalars['String']['output'];
    projects: Array<Projects>;
    projectsCount: Scalars['Int']['output'];
    tasks: Array<Tasks>;
    tasksCount: Scalars['Int']['output'];
    updated_at: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
};
export type UsersActivity_LogsArgs = {
    filter?: InputMaybe<Activity_LogsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<Activity_LogsOrderBy>>;
};
export type UsersActivity_LogsCountArgs = {
    filter?: InputMaybe<Activity_LogsFilter>;
};
export type UsersCommentsArgs = {
    filter?: InputMaybe<CommentsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<CommentsOrderBy>>;
};
export type UsersCommentsCountArgs = {
    filter?: InputMaybe<CommentsFilter>;
};
export type UsersProjectsArgs = {
    filter?: InputMaybe<ProjectsFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};
export type UsersProjectsCountArgs = {
    filter?: InputMaybe<ProjectsFilter>;
};
export type UsersTasksArgs = {
    filter?: InputMaybe<TasksFilter>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<Array<TasksOrderBy>>;
};
export type UsersTasksCountArgs = {
    filter?: InputMaybe<TasksFilter>;
};
export type UsersFilter = {
    activity_logs?: InputMaybe<Activity_LogsListFilter>;
    comments?: InputMaybe<CommentsListFilter>;
    created_at?: InputMaybe<DateTimeFilter>;
    email?: InputMaybe<StringFilter>;
    id?: InputMaybe<BigIntFilter>;
    password_hash?: InputMaybe<StringFilter>;
    projects?: InputMaybe<ProjectsListFilter>;
    tasks?: InputMaybe<TasksListFilter>;
    updated_at?: InputMaybe<DateTimeFilter>;
    username?: InputMaybe<StringFilter>;
};
export type UsersOrderBy = {
    activity_logs?: InputMaybe<Activity_LogsOrderBy>;
    comments?: InputMaybe<CommentsOrderBy>;
    created_at?: InputMaybe<OrderBy>;
    email?: InputMaybe<OrderBy>;
    id?: InputMaybe<OrderBy>;
    password_hash?: InputMaybe<OrderBy>;
    projects?: InputMaybe<ProjectsOrderBy>;
    tasks?: InputMaybe<TasksOrderBy>;
    updated_at?: InputMaybe<OrderBy>;
    username?: InputMaybe<OrderBy>;
};
