import db from './openDB';

// Table Name
const tableName = 'transactions';

// Delete Table
export const deleteTable = () => {
     db.transaction((tx) => {
         tx.executeSql(
            'DROP TABLE IF EXISTS ' + tableName,
            [],
            () => {
                console.log('deleted');
            },
             error => {
                console.log(error);
             }
         );
     });
}

// Create Transactions Table
export const createTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, place VARCHAR(50) NOT NULL, date TEXT NOT NULL, amount FLOAT, type VARCHAR(20) NOT NULL);',
            [],
            () => {
                console.log('created');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Transactions
export const getTransactions = (setTransactions) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            place: row.place,
                            date: row.date,
                            amount: row.amount,
                            type: row.type
                        })
                    }
                }
                else {
                }
                setTransactions(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Purchases
export const getPurchases = (setPurchases) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['Purchases'],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            place: row.place,
                            date: row.date,
                            amount: row.amount,
                            type: row.type
                        })
                    }
                }
                else {
                    ;
                }
                setPurchases(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Savings
export const getSavings = (setSavings) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['Savings'],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            place: row.place,
                            date: row.date,
                            amount: row.amount,
                            type: row.type
                        })
                    }
                }
                else {
                    ;
                }
                setSavings(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// GetTotal Purchases
export const getTotalPurchases = (setTotalPurchases) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['Purchases'],
            (tx, results) => {
                var len = results.rows.length;
                let total = 0;

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        total += row.amount;
                    }
                }
                else {
                    ;
                }
                setTotalPurchases(total)
            },
            error => {
                console.log(error);
            }
        );
    });
}

// GetTotal Savings
export const getTotalSavings = (setTotalSavings) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['Savings'],
            (tx, results) => {
                var len = results.rows.length;
                let total = 0;

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        total += row.amount;
                    }
                }
                else {
                    ;
                }
                setTotalSavings(total)
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert Transactions
export const insertTransaction = (item) => {
    console.log(item.date);
    db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(place, date, amount, type) VALUES(?,?,?,?);',
                [item.place, item.date, item.amount, item.type],
                () => {
                    console.log('inserted');
                },
                error => {
                    console.log(error);
                }
            );
        });
}

// Update Transactions
export const updateTransaction = (item) => {
    db.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET place = ?, date = ?, amount = ?, type = ? WHERE id = ?',
                [item.place, item.date, item.amount, item.type, item.id],
                () => {
                    console.log('updated');
                },
                error => {
                    console.log(error);
                }
            );
        });
}

// Delete Transaction
export const deleteTransaction = (id) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM ' + tableName + ' WHERE id = ?',
            [id],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Drop Table
export const deleteTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}