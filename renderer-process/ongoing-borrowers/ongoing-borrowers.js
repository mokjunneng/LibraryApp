function update_book_borrow(){
  console.log('start');
  dbUser.getSubsetBorrowingUsersFree().then(users => {
    var promises = [];
    users.forEach(user => {
      let borrowed_books = JSON.parse(user.borrowed_books);
      borrowed_books.forEach(book_label => {
          promises.push(new Promise((resolve, reject) => {
              dbBook.getBook(book_label).then(book => {
                  var dateNow = new Date(Date.now()).toISOString()

                  var due_date = moment(book.date_of_return).utc().format('YYYY-MM-DD');
                  if (due_date < dateNow) {
                    // var borrowed_book = book.title + ` (${book.label})`
                    const notifier = require('electron-notifications')

                    // Full Options
                    const notification = notifier.notify('Overdue', {
                      message: book.title + ' by ' + user.name,
                      buttons: ['Dismiss'],
                      duration: 1000000
                    })

                    notification.on('buttonClicked', (text, buttonIndex, options) => {
                      // if (text === 'Info') {
                      //   // Snooze!
                      //   window.location = "./sections/user-records/user-records.html";
                      //   // window.location.href = "./sections/user-records/user-records.html";
                      if(text === 'Dismiss') {
                        //open options.url
                        notification.close()
                      }
                    })
                  }
                  resolve();
              });
          }));
      });
  });

  // Promise.all(promises).then(() => {
  //     dbUser.getBorrowingUsersCount().then(count => {
  //         this.setState({ subsetData : users, totalRecords : count });
  //     });
  // });

}).catch(err => {
  console.log(err);
});
}

update_book_borrow();
