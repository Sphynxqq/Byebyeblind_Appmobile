export async function checkFav(u_id, ticker) {
    try {
        let url = 'http://192.168.1.43:3000/checkFav/' + u_id + '/' + ticker;
        let response = await fetch(url);

        let commits = await response.json();

        return (
            commits
        );
    } catch (error) {
        console.error('Request failed.', error);
        return false;
    }
}

export async function addFav(u_id, ticker) {
    try {
        console.log("addFAv");
        let url = 'http://192.168.1.43:3000/addFav';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: u_id, ticker: ticker })
        });;

    } catch (error) {
        console.error('Request failed.', error);
        return false;
    }
    // console.log(content);

}

export async function delFav(u_id, ticker) {
    try {
        console.log("delFAv");
        let url = 'http://192.168.1.43:3000/delFav';
        console.log(url);
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: u_id, ticker: ticker })
        });;

    } catch (error) {
        console.error('Request failed.', error);
        return false;
    }
    

    
    // try {
    //     console.log("delFAv");
    //     let url = 'http://192.168.1.43:3000/delFav/' + u_id + '/' + ticker;
    //     console.log(url);
    //     fetch(url);
    // } catch (error) {
    //     console.error('Request failed.', error);
    //     return false;
    // }

}

export async function getFav(u_id) {
    try {
        console.log("getFav");
        let url = 'http://192.168.1.43:3000/getFav/' + u_id;
        let response = await fetch(url);

        let commits = await response.json();
        return commits;
    } catch (error) {
        console.error('Request failed.', error);
        return [];
    }

}

export async function getFavStock(ticker) {
    try {
        console.log("getFav");
        let url = 'http://192.168.1.43:3000/getFav/' + ticker;
        let response = await fetch(url);

        let commits = await response.json();
        return commits;
    } catch (error) {
        console.error('Request failed.', error);
        return [];
    }

}