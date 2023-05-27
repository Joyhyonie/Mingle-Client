import { deleteMySchedule, getAcSchedule, getAllAcSchedule, getMySchedule, getAllMySchedule, patchMyScheduleCheck, postMySchedule, putMySchedule, postAcSchedule, putAcSchedule, deleteAcSchedule } from "../modules/ScheduleModule";
import { request } from "./Api";

/* 나의 일정 전체 조회 */
export function callMyScheduleListAPI() {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('accessToken')
        };

        // axios 라이브러리 활용
        const result = await request('GET', `/schedule/mine`, headers);
        console.log(result);
        if(result.status == 200) {
            dispatch(getAllMySchedule(result));
        }

    }

}

/* 선택한 날짜의 나의 일정 조회 */
export function callMyScheduleByDateAPI(date) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('accessToken')
        };

        const result = await request('GET', `/schedule/mine/${date}`, headers);

        if(result.status == 200) {
            dispatch(getMySchedule(result));
        }

    }
}

/* 완료 된 나의 일정 체크 */
export function callMyScheduleCheckAPI(scheCode) {

    return async (dispatch, getState) => {

        const result = await request('PATCH', `/schedule/check/${scheCode}`);

        if(result.status == 200) {
            dispatch(patchMyScheduleCheck(result));
        }

    }
}

/* 나의 일정 등록 */
export function callMyScheduleRegistAPI(formData) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('accessToken')
        };

        const result = await request('POST', `/schedule/mine`, headers, formData);

        if(result.status == 200) {
            dispatch(postMySchedule(result));
        }
    }
}

/* 나의 일정 수정 */
export function callMyScheduleModifyAPI(formData) {

    return async (dispatch, getState) => {

        const headers = {
            'Content-Type': 'application/json',
        };

        const result = await request('PUT', `/schedule/mine`, headers, formData);

        if(result.status == 200) {
            dispatch(putMySchedule(result));
        }
    }

}

/* 나의 일정 삭제 */
export function callMyScheduleRemoveAPI(scheCode) {

    return async (dispatch, getState) => {

        const result = await request('DELETE', `/schedule/mine/${scheCode}`);

        if(result.status == 200) {
            dispatch(deleteMySchedule(result));
        }
    }
}

/* 전체 학사 일정 조회 */
export function callAcScheduleListAPI() {

    return async (dispatch, getState) => {

        const headers = {
            'Content-Type': 'application/json',
        };

        const result = await request('GET', `/schedule/academic`, headers);

        if(result.status == 200) {
            dispatch(getAllAcSchedule(result));
        }

    }

}


/* 특정 학사 일정 조회  */
export function callAcScheduleByDateAPI(date) {

    return async (dispatch, getState) => {

        const headers = {
            'Content-Type': 'application/json',
        };

        const result = await request('GET', `/schedule/academic/${date}`, headers);
        console.log(result);

        if(result.status == 200) {
            dispatch(getAcSchedule(result));
        }

    }
}


/* 학사 일정 등록 */
export function callAcScheduleRegistAPI(formData) {

  return async (dispatch, getState) => {

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem('accessToken')
      };

      const result = await request('POST', `/schedule/academic`, headers, formData);

      if(result.status == 200) {
          dispatch(postAcSchedule(result));
      }
  }
}

/* 학사 일정 수정 */
export function callAcScheduleModifyAPI(formData) {

  return async (dispatch, getState) => {

      const headers = {
          'Content-Type': 'application/json',
      };

      const result = await request('PUT', `/schedule/academic/modify`, headers, formData);

      if(result.status == 200) {
          dispatch(putAcSchedule(result));
      }
  }

}

/* 학사 일정 삭제 */
export function callAcScheduleDeleteAPI(scheCode) {

  return async (dispatch, getState) => {

      const result = await request('DELETE', `/schedule/academic/${scheCode}`);

      if(result.status == 200) {
          dispatch(deleteAcSchedule(result));
      }
  }
}