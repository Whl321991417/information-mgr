interface MenuItem {
    name: string;
    key: string
}
export const menuOptions: { [key: string]: MenuItem[] } = {
    home: [
        {
            name: "今日疫情",
            key: "today"
        },
        {
            name: "最近新闻",
            key: "news"
        }, {
            name: "疫情辟谣",
            key: "piyao"
        },
        {
            name: "卫生安全",
            key: "safe"
        }
    ],
    check: [
        {
            name: "学生信息",
            key: "infstudents"
        },
        {
            name: "班级信息",
            key: "infclassroom"
        },
        {
            name: "住宿信息",
            key: "infdorm"
        },
        {
            name: "疫苗接种",
            key: "vaccin"
        }
    ],
    Manage:[
        {
            name: "学生管理",
            key: "managestudents"
        },
        {
            name: "班级管理",
            key: "manageclassroom"
        },
        {
            name: "楼层管理",
            key: "managefloor"
        }
    ],
    MyInf:[
        {
            name: "个人信息",
            key: "myinformation"
        },
    ]

}