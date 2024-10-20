<template>
  <div>
    <p>You can use inheritance to extend the functionality of any Stimulus component:</p>

    <ContentSlot />

    <p>This controller will automatically have access to targets defined in the parent class.</p>

    <p>
      If you override the <code>connect</code>, <code>disconnect</code> or any other methods from the parent, you'll
      want to call <code>super.method()</code> to make sure the parent functionality is executed.
    </p>
  </div>
</template>
