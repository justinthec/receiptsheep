// oauth secret Xvmy8PgLpyXPwMt9PrOyVbk6HLNRpbxLsacppxW0

// oauth token qyprdax5X3MMOf0dxWk9Qyqj6xBuHmwG3nTwAtJa2ga6BtZQ


// var 1430784435
function intuitExpense(name, price)
{
	var QuickBooks = require('node-quickbooks')
 


	var consumer_key = 'qyprdrXwS5QmV24CY9pPD7HUwsG2rD';
	 
	var consumer_secret = 'xmIcjER1RVao11KvbpJBflA9rQcmMM0gCYDaYglR';
	 
	var access_token = 'qyprdtTel918KIlTeJY9vL0VKInfzfU1y7SKj0rJ2PTA6D0c';

	var access_token_secret = '6q2SyfUQjn1lozIYNZVlYuIjXhJPCicVajLIW7eU';
	 
	var realmId = 405196046;

	var qbo = new QuickBooks(consumer_key,
	                         consumer_secret,
	                         access_token,
	                         access_token_secret,
	                         realmId,
	                         true, // don't use the sandbox (i.e. for testing) 
	                         true);




	// function inputEntry (createDate, description, )

	var new_entry = 
	  {
		  "AccountRef": {
		    "value": "42",
		    "name": "Visa"
		  },
		  "PaymentType": "CreditCard",
		  "TxnDate": "2015-09-15",
		  "Line": [
		    {
		      "Amount": 17.69,
		      "DetailType": "AccountBasedExpenseLineDetail",
		      "AccountBasedExpenseLineDetail": {
		       "AccountRef": {
		          "name": "Miscellaneous",
		          "value": "14"
		        }
		      }
		    }
		  ]
		};

	new_entry["Line"][0]["Amount"] = price;
	new_entry["PrivateNote"]= name;
	new_entry["TxnDate"] = new Date();

	qbo.createPurchase(new_entry, function(e, obj){

	});



}

module.exports = {
	intuitExpense: intuitExpense
};
