__devMode__&& console.log('src/comps/logsignin/redux/actions')

import * as types from './types'
import {request} from 'graphql-request'

// const logsigninReset= name=>()=>
// (
//   {
//     type:types.LOGSIGNIN_RESET_+name
//   }
// )

export const logsigninSetShow= name=> val=>dispatch=>
{
  dispatch
  (
    {
      type: types.LOGSIGNIN_SET_SHOW_+name,
      val: val
    }
  )
}

const logsigninSet= name=> val=>
(
  {
    type: types.LOGSIGNIN_SET_+name,
    val: val
  }
)

const logsigninFetching= name=> ()=>
(
  {
    type: types.LOGSIGNIN_FETCHING_+name
  }
)

export const logsigninFetch= name=> data=> dispatch=>
{
  dispatch(logsigninFetching(name)())
  request
  (
    __backend__,
    `
      mutation
      {
        login(email:"${data.email}",psswrd:"${data.psswrd}")
        {
          res
          {
            name
            email
            id
          }
        }
      }
    `
  ).then(data=> dispatch(logsigninSet(name)(data.login.res)))
}

export const logsigninSetListeners= name=>val=>
(
  {
    type:types.LOGSIGNIN_SET_LISTENERS_+name,
    val:val
  }
)