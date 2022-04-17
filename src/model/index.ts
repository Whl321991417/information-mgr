//学生信息表
export interface StudentInfo {
    stunum: string,
    name: string,
    sex: string,
    birthday: string,
    college: string,//学院
    classroom: string,
    livebuilding: string,
    dorm: string,
    classteacher: string,
    phone: string,
    vaccin: string,//疫苗接种情况
    vaccintime: string,//最近接种时间
    symptom: string//症状
}

//老师信息表
export interface TeacherInfo {
    teachernum: string,
    name: string,
    sex: string,
    birthday: string,
    college: string,//学院
    classroom: string,//负责班级
    phone: string,
}

//宿舍楼信息
export interface livebuildingInfo {
    buildnum: string,
    buildname: string,
    administrators: string,
    phone: string,

}
export interface LoginParams {
    username: string;
    upwd: string
}

export interface Add {
    confirm: number;//累计确证
    dead: number;//死亡
    heal: number;//治愈
    importedCase: number;//境外输入----------
    localConfirm: number;//本土确诊
    noInfect: number;//无症状感染者
    nowConfirm: number;//现有确证

}
export interface Total {//总数 
    confirm: number;//累计确证
    dead: number;//死亡
    heal: number;//治愈
    importedCase: number;//境外输入----------
    localConfirm: number;//本土确诊
    noInfect: number;//无症状感染者
    nowConfirm: number;//现有确证
}