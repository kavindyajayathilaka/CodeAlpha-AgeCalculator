const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(document.getElementById("date-input").value);

    const birthDetails = {
      date: inputDate.getDate(),
      month: inputDate.getMonth() + 1,
      year: inputDate.getFullYear(),
    };
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
  
    // Display error message
    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        document.getElementById("error-message").textContent = "Please select a date in the past or present.";
        displayResult("-", "-", "-");
        return;
    } 

    else {
        // Instead of overwriting the entire text, create a span element for the quote
        const quote = document.createElement("span");
        quote.textContent = "Life is short, laugh often!";
        quote.style.color = "#085732";
        quote.style.fontSize = "14.5px";
        quote.style.fontWeight = "200";

        // Clear the error message element (optional)
        document.getElementById("error-message").textContent = "";
    
        // Append the quote span to the error message element
        document.getElementById("error-message").appendChild(quote);
    }

     
    const { years, months, days } = calculateAge(
      birthDetails,
      currentYear,
      currentMonth,
      currentDate
    );
  
    displayResult(days, months, years);
};
  
  
// Define future dates
const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
      birthDetails.year > currentYear ||
      (birthDetails.year === currentYear &&
        (birthDetails.month > currentMonth ||
          (birthDetails.month === currentMonth &&
            birthDetails.date > currentDate)))
    );
};
  
//Calculate age
const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;
  
    if (currentMonth < birthDetails.month) {
      years--;
      months = 12 - (birthDetails.month - currentMonth);
    } else {
      months = currentMonth - birthDetails.month;
    }
  
    if (currentDate < birthDetails.date) {
      months--;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
      days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
      days = currentDate - birthDetails.date;
    }
    return { years, months, days };
};
  

// Calculate days in month for leap year 
const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const getDaysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return getDaysInMonth[month - 1];
};
  

const displayResult = (bdate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bdate;
};

  
document.getElementById("calc-age-btn").addEventListener("click", ageCalculate);

// Add event listener for refresh button
document.getElementById("refresh-btn").addEventListener("click", () => {
    window.location.reload();
});  

const buttons = document.querySelectorAll("button"); // Select all buttons on the page
buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.style.cursor = "pointer"; // Change cursor to "pointer" on hover
    });

    button.addEventListener("mouseout", () => {
        button.style.cursor = "default"; // Change cursor back to "default" on leave
    });
});



