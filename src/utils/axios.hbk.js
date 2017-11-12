import axios from 'axios'

/*
 obj是传过来的目标
 url路径
 option是方法名，是个字符串
 方法在调用ajax的组件中的methods中定义好
 * */
//连调
// export default function homedata(obj, url,option) {
// 	axios.get(url)
//        .then((res)=>{
//  			obj[option](res);
// 		})
// }
export default function homedata(obj, url,option) {
	axios.post(url,{
		keyword:'',
		curpage:1,
		page:5
	})
			.then((res)=>{
		obj[option](res);
	})
}
