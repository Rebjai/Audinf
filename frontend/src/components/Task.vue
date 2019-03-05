<template>
    <div class="task-item">
        <span class="task-item-name"> {{ task.name }} </span>
        <button @click="$emit('deleteTask', task._id)"><i class="far fa-trash-alt"></i></button>
        <span class="task-item-date" :class="termTimeStyle"  v-if="task.term" > <i class="far fa-clock"></i> <span class="term-date-text">{{ task.term }}</span> </span>
    </div>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {
            isToday: false,
            isLate: false,
        }
    },
    computed: {
        todaysDate() {
            return new Date().toISOString().split('T')[0]
        },
        termTimeStyle() {
            return {
                'term-today': this.todaysDate == this.task.term ? true : false,
                'term-late': this.todaysDate > this.task.term ? true : false,
            }
        }
    }
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
        margin-bottom: 10px;
    }
    .task-item-date {
        grid-column: 1 / -1;
        font-size: .85em;
        padding-left: 5px;
    }
    .task-item-name {
        background-color: #444;
        border-radius: 5px;
        padding: 2px 5px 2px 5px;
    }

    .task-item > span {
        word-break: break-word;
    }

    .task-item > button {
        width: 2em;
        height: 2em;
        align-self: start;
        display: grid;
        align-items: center;
        justify-items: center;
    }

    .term-date-text {
        margin-left: 5px;
        padding: 1px 3px;
    }

    .term-today .term-date-text {
        color: rgb(255, 218, 116);
    }
    .term-late .term-date-text {
        color: rgb(255, 118, 118);
    }
</style>
