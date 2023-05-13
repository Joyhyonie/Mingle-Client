let eventGuid = 0; // 이벤트 아이디 인덱스
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// 달력 로딩 후 초기화할 이벤트 내용
export const INITIAL_EVENTS = [];

// 각 이벤트에 추가될 새로운 아이디 생성
export function createEventId() {
  return String(eventGuid++);
}