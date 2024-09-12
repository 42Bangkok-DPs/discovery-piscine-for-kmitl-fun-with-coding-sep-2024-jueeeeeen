// delete_cookies()
retrieve_todos()

function create_to_do(){
    new_to_do_text = prompt("Enter a new TO DO")
    if (new_to_do_text !== null && new_to_do_text.trim() !== ''){
        add_to_do(new_to_do_text);
    }
}

function add_to_do(data){
    const to_do_container = document.getElementById('ft_list');
    const new_to_do = document.createElement('div');
    new_to_do.className = "to-do-content";
    new_to_do.textContent = data;
    new_to_do.onclick = function() { delete_to_do(this); };
    to_do_container.prepend(new_to_do);
    set_cookie();
}

function set_cookie(){
    const to_do_container = document.getElementById('ft_list')
    const todos = to_do_container.getElementsByClassName('to-do-content')
    let todos_str = "";
    for (i=0; i<todos.length; i++){
        todos_str += todos[i].textContent + "-"
    }
    todos_str = todos_str.slice(0, -1);
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 5);

    document.cookie = "todos=" + encodeURIComponent(todos_str) + "; expires=" + date.toUTCString() + "; path=/";
}

function delete_to_do(todo_element){
    if (confirm("confirm deletion?")){
        todo_element.remove()
        set_cookie()
    }
}

function get_cookie(){
    let cookies = document.cookie.split(';')[0].split('=')[1]
    if (!cookies) return null;
    return decodeURIComponent(cookies).split('-');
}

function retrieve_todos(){
    const todos = get_cookie();
    if (!todos) return
    todos.reverse().forEach(todo => {
        if (todo.trim()) {
            add_to_do(todo);
        }
    });
}

function delete_cookies(){
    document.cookie = "todos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
