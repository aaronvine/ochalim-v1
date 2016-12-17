import React from 'react';
import { Link } from 'react-router';
import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = SidebarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SidebarStore.listen(this.onChange);
    const socket = io.connect();

    socket.on('onlineUsers', (data) => {
      SidebarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      SidebarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        SidebarActions.updateAjaxAnimation('fadeOut');
      }, 500);
    });
  }

  componentWillUnmount() {
    SidebarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    const searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      SidebarActions.findCharacter({
        searchQuery,
        searchForm: this.state.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div className='sidebar'>
        <div className='search-form-container'>
          <form
            ref={(c) => { this.state.searchForm = c; }}
            className='sidebar-form'
            onSubmit={() => this.handleSubmit()}
          >
            <div className='input-group'>
              <input type='text' className='form-control' placeholder={`${this.state.totalCharacters} characters`} value={this.state.searchQuery} onChange={SidebarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={() => this.handleSubmit()}>
                  <span className='glyphicon glyphicon-search' />
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Sidebar;
