$(document).ready(function() {
    // delete_cookies()
    retrieve_todos()

    function create_to_do(){
        new_to_do_text = prompt("Enter a new TO DO")
        if (new_to_do_text !== null && new_to_do_text.trim() !== ''){
            add_to_do(new_to_do_text);
        }
    }
    
    function add_to_do(data) {
        const to_do_container = $('#ft_list');
        const new_to_do = $('<div></div>').addClass("to-do-content").text(data);
    
        new_to_do.click(function() {
            delete_to_do(this);
        });
    
        to_do_container.prepend(new_to_do);
        set_cookie();
    }
    
    function set_cookie(){
        const todos = $('#ft_list .to-do-content');
        let todos_str = "";

        todos.each(function() {
            todos_str += encodeURIComponent($(this).text()) + "|";
        });

        todos_str = todos_str.slice(0, -1);
        const date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 5);
    
        document.cookie = "todos=" + todos_str + "; expires=" + date.toUTCString() + "; path=/";
    }
    
    function delete_to_do(todo_element){
        if (confirm("confirm deletion?")){
            $(todo_element).remove();
            set_cookie();
        }
    }
    
    function get_cookie(){
        let cookies = document.cookie.split(';')[0].split('=')[1]
        if (!cookies) return null;
        cookies = cookies.split('|')
        return cookies;
    }
    
    function retrieve_todos(){
        const todos = get_cookie();
        if (!todos) return
        todos.reverse().forEach(todo => {
            if (todo.trim()) {
                add_to_do(decodeURIComponent(todo));
            }
        });
    }
    
    function delete_cookies(){
        document.cookie = "todos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    }

    $('.new-btn').click(create_to_do)
})
