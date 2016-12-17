import { assign } from 'underscore';
import alt from '../alt';

class SidebarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'findPostSuccess',
      'findPostFail'
    );
  }

  findPost(payload) {
    $.ajax({
      url: '/api/posts/search',
      data: { name: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findPostSuccess(payload);
      })
      .fail(() => {
        this.actions.findPostFail(payload);
      });
  }
}

export default alt.createActions(SidebarActions);
