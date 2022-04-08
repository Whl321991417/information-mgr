import "./index.scss";

export default function Piyao() {

    interface dataobj {
        name: string;
        key: string;
        value: string;
        color: string;
    }
    const NewValues: dataobj[] = [
        {
            name: "现有确证",
            key: "xianyouQZ",
            value: "20111",
            color: "#CC3333"
        }, {
            name: "无症状",
            key: "wuZZ",
            value: "20111",
            color: "#CC1000"
        }, {
            name: "现有疑似",
            key: "xianyouYS",
            value: "20111",
            color: "#000099"
        }, {
            name: "现有重症",
            key: "xianyouZZ",
            value: "20111",
            color: "#990000"
        }, {
            name: "累计确诊",
            key: "leijiQZ",
            value: "20111",
            color: "#6633CC"
        }, {
            name: "境外输入",
            key: "jingwaiSR",
            value: "20111",
            color: "#66CCCC"
        }, {
            name: "累计治愈",
            key: "leijiZY",
            value: "20111",
            color: "#107010"
        }, {
            name: "累计死亡",
            key: "leijiSW",
            value: "20111",
            color: "#000000"
        }
    ];
    let time = new Date();
    let month = time.toLocaleDateString();
    return (
        <div className="today">
            <h3>今日疫情</h3>
            <div className="shuoming">
                <span className="data-new">数据更新于{month}</span><span className="data-ex">数据说明</span>
            </div>
            <div className="data-list">
                {NewValues.map(obj => {
                    let a = {
                        color: obj.color
                    }
                    return <div key={obj.name}>
                        <span>{obj.name}</span>
                        <span style={a}>{obj.value}</span>
                    </div>
                }
                )}
            </div>
        </div>
    );
}