<script>
  let usersPromise = getUsers();

  async function getUsers() {
    const res = await fetch('/api/v1/users');
    const users = res.json();

    console.log(res);
    console.log(users);

    return users;
  }

  function handleClick() {
    usersPromise = getUsers();
  }
</script>

<button on:click={handleClick}> reload </button>

{#await usersPromise}
  <div>...wait</div>
{:then users}
  <div>users.id</div>
  {#each users as { id, data }, i}
    <div>{i}:{id}:{data.id}</div>
  {/each}
{:catch error}
  <div style="color: red">{error.message}</div>
{/await}

<style type="text/css">
</style>
