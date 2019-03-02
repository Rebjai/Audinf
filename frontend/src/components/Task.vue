<template>
    <div class="task-item">
        <span> {{ task.name }} </span>
        <button>X</button>
    </div>
</template>

<script>
export default {
    props: ['task']
}
</script>

<style>
    .task-item {
        display: grid;
        background-color: #333;
        padding: .2em .3em;
        border-radius: 5px;
        align-items: center;
        grid-gap: 5px;
        grid-template-columns: 1fr auto;
    }

    .task-item > span {
        word-break: break-word;
    }

    .task-item > button {
        width: 30px;
        height: 30px;
        align-self: start;
        display: grid;
        align-items: center;
        justify-items: center;
    }
</style>
