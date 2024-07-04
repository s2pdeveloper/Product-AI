function isPrime(num) {

    if (num <= 1) {
        return false
    }
    let count = 0;
    for (let i = 2; i <= num - 1; i++) {
        if (num % i == 0) {
            count++;
        }
    }

    if (count < 1) {
        return true;
    } else { return false; }
}

function sumOfPrimeNumbers(limit) {
    let answer = 0;
    //Write your code below
    for (let  i= 1; i <= limit; i++) {
        if (isPrime(i)) {
            answer += i;
        }
    }
    return answer
}

console.log("your answer", sumOfPrimeNumbers(5));