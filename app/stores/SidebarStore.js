import alt from '../alt';
import SidebarActions from '../actions/SidebarActions';

class SidebarStore {
  constructor() {
    this.bindActions(SidebarActions);
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimationClass = '';
  }

  static onFindPostSuccess(payload) {
    payload.history.pushState(null, `/posts/${payload.postId}`);
  }

  static onFindPostFail(payload) {
    payload.searchForm.classList.add('shake');
    setTimeout(() => {
      payload.searchForm.classList.remove('shake');
    }, 1000);
  }

  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className;
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

}

export default alt.createStore(SidebarStore);
