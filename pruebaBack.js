const clients = [
{ id: 1, rut: "89873550", name: "LARA RENE PETTY BERGER" },
{ id: 2, rut: "86833361", name: "CONWAY LANDRY POLLARD BRADLEY" },
{ id: 3, rut: "88271452", name: "MICHELLE LETITIA BATTLE MOONEY" },
{ id: 4, rut: "87252013", name: "SIMMONS NELSON WITT MONROE" },
{ id: 5, rut: "81706494", name: "BRADY MARY RANDALL FERNANDEZ" },
{ id: 6, rut: "71167355", name: "ACOSTA COLE ATKINSON PITTS" },
{ id: 7, rut: "79093176", name: "DOMINGUEZ HOUSE GONZALES SALAZAR" },
{ id: 8, rut: "91361017", name: "KIRSTEN COLLINS BYERS COFFEY" },
{ id: 9, rut: "9065642K", name: "FIELDS RATLIFF MORRIS QUINN" }
];
const banks = [
{ id: 1, name: 'SCOTIABANK' },
{ id: 2, name: 'BCI' },
{ id: 3, name: 'ITAU' },
{ id: 4, name: 'CONDELL' },
];
const accounts = [
{ clientId: 4, bankId: 1, balance: 79069 },
{ clientId: 6, bankId: 3, balance: 136060 },
{ clientId: 9, bankId: 3, balance: 74908 },
{ clientId: 2, bankId: 2, balance: 4391 },
{ clientId: 6, bankId: 2, balance: 116707 },
{ clientId: 1, bankId: 3, balance: 157627 },
{ clientId: 5, bankId: 4, balance: 136372 },
{ clientId: 7, bankId: 4, balance: 190204 },
{ clientId: 5, bankId: 4, balance: 149670 },
{ clientId: 2, bankId: 3, balance: 143321 },
{ clientId: 2, bankId: 4, balance: 67466 },
{ clientId: 2, bankId: 3, balance: 17956 },
{ clientId: 9, bankId: 2, balance: 43194 },
{ clientId: 5, bankId: 1, balance: 52245 },
{ clientId: 6, bankId: 2, balance: 41562 },
{ clientId: 3, bankId: 2, balance: 138046 },
{ clientId: 6, bankId: 3, balance: 196964 },
{ clientId: 8, bankId: 3, balance: 73803 },
{ clientId: 9, bankId: 2, balance: 150402 },
{ clientId: 7, bankId: 1, balance: 122869 },
{ clientId: 5, bankId: 4, balance: 65223 },
{ clientId: 7, bankId: 3, balance: 143589 },
{ clientId: 9, bankId: 3, balance: 43346 },
{ clientId: 2, bankId: 1, balance: 60421 },
{ clientId: 4, bankId: 4, balance: 184110 },
{ clientId: 8, bankId: 4, balance: 195903 },
{ clientId: 5, bankId: 2, balance: 77649 },
{ clientId: 8, bankId: 4, balance: 28170 },
{ clientId: 5, bankId: 1, balance: 132850 },
{ clientId: 1, bankId: 3, balance: 139679 },
{ clientId: 7, bankId: 4, balance: 119808 },
{ clientId: 4, bankId: 4, balance: 109201 },
{ clientId: 9, bankId: 3, balance: 112529 },
{ clientId: 1, bankId: 3, balance: 137914 },
{ clientId: 6, bankId: 2, balance: 122904 },
{ clientId: 5, bankId: 4, balance: 103142 },
{ clientId: 8, bankId: 2, balance: 69163 },
{ clientId: 2, bankId: 4, balance: 57812 },
{ clientId: 2, bankId: 3, balance: 32851 },
{ clientId: 7, bankId: 1, balance: 109763 },
{ clientId: 8, bankId: 3, balance: 147442 },
{ clientId: 9, bankId: 1, balance: 42217 },
{ clientId: 1, bankId: 1, balance: 39658 },
{ clientId: 6, bankId: 2, balance: 8664 },
{ clientId: 8, bankId: 1, balance: 41915 },
{ clientId: 7, bankId: 1, balance: 31879 },
{ clientId: 7, bankId: 4, balance: 117795 },
{ clientId: 1, bankId: 4, balance: 108862 },
{ clientId: 5, bankId: 1, balance: 18550 },
];


// Ejercicio 0 
// Retornar un arreglo con los ID de los clientes

function exercise0() {
 return clients.map(client =>client.id);
}

//Ejercicio 1
//Retornar un arreglo con los ID de los clientes ordenados por RUT


function exercise1(){
    const idOrdenados = clients
    .sort((a, b) => a.rut.localeCompare(b.rut))
    .map(client => client.id);
    return idOrdenados;
}




//Ejercicio 2
//Retornar un arreglo con los nombres de los clientes, ordenados de mayor a menor
//por la suma TOTAL de los saldos de las Cuentas

function exercise2(){
const clientBalances = {};

// Calcular la suma total de los balances de cada cliente
accounts.forEach(account => {
  const { clientId, balance } = account;
  clientBalances[clientId] = (clientBalances[clientId] || 0) + balance;
});

// Ordenar los clientes por la suma total de sus saldos en orden descendente 
const sortedClients = clients.sort((clientA, clientB) => {
  const balanceA = clientBalances[clientA.id] || 0;
  const balanceB = clientBalances[clientB.id] || 0;
  return balanceB - balanceA;
});

// Obtener el arreglo de nombres
const sortedClientNames = sortedClients.map(client => client.name);
return sortedClientNames;
}



//Ejercicio3
//Devuelve un objeto cuyo índice es el nombre de los bancos
//y cuyo valor es un arreglo de los ruts de los clientes ordenados alfabéticamente por 'nombre'


function exercise3(){
const bankClients = {};

// Agrupar los clientes por banco
clients.forEach(client => {
  const { id, rut, name } = client;
  const clientAccounts = accounts.filter(account => account.clientId === id);
  clientAccounts.forEach(account => {
    const { bankId } = account;
    const bankName = banks.find(bank => bank.id === bankId)?.name;
    if (bankName) {
      if (bankClients.hasOwnProperty(bankName)) {
        if (!bankClients[bankName].hasOwnProperty(rut)) {
          bankClients[bankName][rut] = name;
        }
      } else {
        bankClients[bankName] = { [rut]: name };
      }
    }
  });
});

// Ordenar alfabéticamente los ruts de cada banco según el nombre de cliente
for (const bankName in bankClients) {
  const clientRuts = Object.keys(bankClients[bankName]).sort((a, b) =>
    bankClients[bankName][a].localeCompare(bankClients[bankName][b])
  );
  bankClients[bankName] = clientRuts;
}
    return bankClients; 
}


// Ejercicio 4
// Devuelve un arreglo ordenado de mayor a menor con el saldo de los clientes que
// tengan más de 25000 en el banco 'SCOTIABANK'

function exercise4(){
    const scotiabankClients = accounts
    .filter(account => account.bankId === 1 && account.balance > 25000)
    .reduce((accumulator, account) => {
      const client = clients.find(client => client.id === account.clientId);
      const existingClient = accumulator.find(c => c.name === client.name);
      
      if (existingClient) {
        existingClient.balance += account.balance;
      } else {
        accumulator.push({ name: client.name, balance: account.balance });
      }
      
      return accumulator;
    }, [])
    .sort((a, b) => b.balance - a.balance);
    return scotiabankClients;
}






// Ejercicio 5
// Devuelve un arreglo con la 'id' de los Bancos de menor a mayor por el
// TOTAL de dinero que administran en las cuentas de sus clientes

function exercise5(){
    const bankBalances = banks.map(bank => {
        const bankAccounts = accounts.filter(account => account.bankId === bank.id);
        const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);
        return { bankId: bank.id, totalBalance: totalBalance };
      });
      
      const sortedBanks = bankBalances.sort((a, b) => a.totalBalance - b.totalBalance);
      const bankIds = sortedBanks.map(bank => bank.bankId);
      return bankIds;    
}



// Ejercicio 6
// Devuelve un objeto en donde la key son los nombre de los bancos
// y el valor es la cantidad de clientes que solo tienen una cuenta en ese banco

function exercise6(){
    const uniqueClientsByBank = accounts.reduce((result, account) => {
        const { clientId, bankId } = account;
        const client = clients.find(client => client.id === clientId);
        const bank = banks.find(bank => bank.id === bankId);
        
        if (client && bank) {
          const clientAccounts = accounts.filter(acc => acc.clientId === clientId);
          const uniqueBankAccounts = clientAccounts.filter(acc => acc.bankId === bankId);
          
          if (uniqueBankAccounts.length === 1) {
            result[bank.name] = (result[bank.name] || 0) + 1;
          }
        }
        
        return result;
      }, {});
      return uniqueClientsByBank;
}

  
  

// Ejercicio 7
// Devuelve un objeto en donde la key son el nombre de los bancos
// y el valor es el 'id' de su cliente con menos dinero.


function exercise7(){
    const bankClientsWithLeastBalance = {};

accounts.forEach(account => {
  const { clientId, bankId, balance } = account;
  const client = clients.find(client => client.id === clientId);
  const bank = banks.find(bank => bank.id === bankId);

  if (client && bank) {
    const clientAccounts = accounts.filter(acc => acc.clientId === clientId && acc.bankId === bankId);
    const totalBalance = clientAccounts.reduce((sum, acc) => sum + acc.balance, 0);

    if (!(bank.name in bankClientsWithLeastBalance) || totalBalance < bankClientsWithLeastBalance[bank.name].totalBalance) {
      bankClientsWithLeastBalance[bank.name] = { clientId, totalBalance };
    }
  }
});

return bankClientsWithLeastBalance;
    
}




console.log("Ejercicio 0 --> ", exercise0() || "Ejercicio no resuelto");
console.log("Ejercicio 1 --> ", exercise1() || "Ejercicio no resuelto");
console.log("Ejercicio 2 --> ", exercise2() || "Ejercicio no resuelto");
console.log("Ejercicio 3 --> ", exercise3() || "Ejercicio no resuelto");
console.log("Ejercicio 4 --> ", exercise4() || "Ejercicio no resuelto");
console.log("Ejercicio 5 --> ", exercise5() || "Ejercicio no resuelto");
console.log("Ejercicio 6 --> ", exercise6() || "Ejercicio no resuelto");
console.log("Ejercicio 7 --> ", exercise7() || "Ejercicio no resuelto");
process.exit();