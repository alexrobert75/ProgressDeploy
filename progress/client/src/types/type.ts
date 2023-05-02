export type UserInfo = 
{
    email: string;
    password: string;
    firstName: string;
    lastName:string;
    schoolClass: SchoolClassEnum
}


export enum SchoolClassEnum {
    "5G2" = "5G2",
    "4G2" = "4G2",
    "6G2" = "6G2",
    "3G2" = "3G2",
    "2G2" = "2G2",
    "1G2" = "1G2"
} 

export type AuthInfo = 
{
    email: string;
    password: string;
}

export type Answer = {
    questionId: string;
    repartition: number;
    reponse: number;
}

export type Evaluation = {
    evalFormatted : {userId: string;
    answerList: Answer[];}
    finalGrade : Number;
}
