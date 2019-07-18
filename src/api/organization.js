import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/departments',
    method: 'get',
	  params: query
  })
}
//根据id获取
export function getIdData(id) {
  return request({
    url: '/points/'+id,
    method: 'get',
    params: { id }
  })
}

//编辑
export function updateData(data) {
  return request({
    url: '/v1/pointsData/update',
    method: 'put',
    data
  })
}
//创建
export function createdata(data) {
  return request({
    url: '/v1/pointsData/insert',
    method: 'post',
    data
  })
}

//删除
export function deleteBasidata(id) {
  return request({
    url: '/v1/pointsData/delete/'+id,
    method: 'delete'
  })
}




