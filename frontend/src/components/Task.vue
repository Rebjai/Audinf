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
        grid-template-columns: 1fr 50px;
        align-items: center;
    }
    .task-item > button {
        border: solid #e7e7e7 1px;
        border-radius: 5px;
        background-color: transparent;
        width: 25px;
        height: 25px;
        justify-self: center;
    }
</style>
