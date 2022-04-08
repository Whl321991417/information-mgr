import "./index.scss";
import img from '../../../assets/Imgs/newsTitleImg.png';
export default function News() {
    let time = new Date();
    let month = time.toLocaleDateString();
      const news =[
        {
            img:img,
            time:month,
            title:'兰州城市管理数字化监控为疫情防控赋能',
            ip:'https://baijiahao.baidu.com/s?id=1728881971562763683&wfr=spider&for=pc'
      }
    ];
    return (
        <div>
            <h1>最近新闻</h1>
            {
            news.map(obj=>{
                return <div>
                    obj.img
                    </div>
                })
            }
        </div>  
    )
}