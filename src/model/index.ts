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
export interface TreeNode {
    id: string;
    type: string
}
export interface userShowModal {
    type: string,
    data?: string
}
export enum DormitoryType {
    AREA = "area",//区域
    APARTMENT = "apartment",//公寓楼
    ROOM = "room" //宿舍
}

export interface TreeNodeItem {
    id: string;
    type: string;
    manager: string;
    name: string;
    pid: string;
    children: TreeNodeItem[]
}