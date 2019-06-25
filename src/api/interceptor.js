import $qs from 'qs'
import $axios from 'axios'
import msgbox from '@/assets/js/msgbox'
$axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : '//api.3keji.com'
$axios.defaults.timeout = 5000;

$axios.interceptors.request.use(config => {
  // loading开始
  config.method === 'post'
      ? config.data = $qs.stringify({...config.data})
      : config.params = {...config.params};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
}, error => {  //请求错误处理
  msgbox.alert(error)
  Promise.reject(error)
});

$axios.interceptors.response.use(
  response => {  //成功请求到数据
      // loading结束
      //这里根据后端提供的数据进行对应的处理
      if (response.data.code === 0) {
          return response.data.data;
      } else {
          msgbox.alert(response.data.msg)
          return Promise.reject(response.data.msg)
      }
  },
  error => {  //响应错误处理
      console.log('error');
      console.log(error);
      console.log(JSON.stringify(error));
      let text = JSON.parse(JSON.stringify(error)).response.status === 404
          ? '404'
          : '网络异常，请重试';
          msgbox.alert(text)

      return Promise.reject(error)
  }
);

export default $axios
