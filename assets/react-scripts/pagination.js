var PropTypes = require('prop-types');
var React = require('react');

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
}

class Pagination extends React.Component {
  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */ 
  constructor(props) {
    super(props);
    const { pageLimit = 30, pageNeighbours = 0 } = props;
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours = typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;
    this.state = { currentPage: 1 };
    this.gotoPage = this.gotoPage.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
  }

  fetchPageNumbers() {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          // const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          // const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages);

  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage(page) {
    const { onPageChanged } = this.props;
    const currentPage = Math.max(0, page);
    const paginationData = {
      currentPage,
    };
    this.setState({ currentPage: currentPage }, () => onPageChanged(paginationData))
  }

  handleClick(page) {
    var gotoPage = this.gotoPage;
    return function(e) {
      e.preventDefault();
      gotoPage(page);
    };
  }

  handleMoveLeft(event) {
    event.preventDefault();
    this.gotoPage(this.state.currentPage - 1);
  }

  handleMoveRight(event) {
    event.preventDefault();
    this.gotoPage(this.state.currentPage + 1);
  }

  render() {
    const { totalRecords, pageLimit } = this.props;
    this.totalPages = Math.ceil(totalRecords / pageLimit);

    if (!totalRecords || this.totalPages === 1) return null;
    
    var { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <React.Fragment>
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          <a className="pagination-previous" onClick={currentPage == 1 ? null : this.handleMoveLeft } disabled={currentPage == 1}>Previous</a>
          <a className="pagination-next" onClick={currentPage == this.totalPages ? null : this.handleMoveRight} disabled={currentPage == this.totalPages}>Next</a>
          <ul className="pagination-list">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              );

              return (
                <li key={index}>
                  <a className={`pagination-link${ currentPage === page ? ' is-current' : ''}`} href="#" onClick={ this.handleClick(page) }>{ page }</a>
                </li>
              );

            }) }
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

module.exports = Pagination;
