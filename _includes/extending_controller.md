You can use inheritance to extend the functionality of any Stimulus component:

{{ include.content }}

This controller will automatically have access to targets defined in the parent class.

If you override the `connect`, `disconnect` or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.
