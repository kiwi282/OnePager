function flyAway() {
    const butterfly = document.querySelector('.butterfly-img');
    
    if (!butterfly.classList.contains('fly-away')) {
        butterfly.classList.add('fly-away');
        console.log("Consequences triggered...");
    }
}