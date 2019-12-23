# reactlibs-ts

This is a refactor of my original [`reactlibs`](https://github.com/landisdesign/reactlibs)
project, using TypeScript and classes for my React components. I haven't
explored TypeScript much, but it is useful for larger projects, so this is a
playground. Also, while functional components and hooks are much simpler for
me, I can imagine large codebases being primarily class-based, so it will be
valuable for me to get some practice with that.

## First impressions: TypeScript

For the most part TypeScript has been fun. My Java background helps me adopt
it fairly quickly. My main challenge is, of course, not knowing what I don't
know. It took me a while to understand how to merge data together and retain
type safety, and I'm sure there are many other things I've been missing.

One thing I've noticed is how many classes and interfaces proliferate once
data types need to be clarified. Things that used to be one-size-fits-all
end up becoming a type per variant. In some cases I've been able to use
generics, while in other cases I've used interfaces built of entirely
optional parameters, and in still others I've been able to use type unions.

### Redux

I've seen different examples with varying levels of type definition, from using
`ReturnType<typeof x>` and letting TypeScript work it out on the fly, to
defining everything individually.

I'm currently opting for defining everything individually. It feels arduous,
but it's also helping me get a feel for creating types and working with them.
It also helps me make sure that I don't make a small change that cascades
through the entire codebase simply by changing a function return without
having to change the return type definition. As I continue, I may undo this and
try it again with less handwritten definition.

I'm choosing to type the state pretty heavily, to allow it to take care of
itself. By creating a `Cloneable<T>` interface, the top level of state doesn't
need to know how to duplicate itself. It just needs to tell its members to
clone themselves.

Similarly I can enforce the immutability of array and object fields by making
them private and providing accessor methods, in addition to making the fields
themselves readonly.

Any calculation to create object state is done in the constructor. This lets
me keep the reducers much smaller, simply retrieving payloads and delivering
them to the classes to return new state objects with the changes reflected in
them.

I honestly don't know whether or not this is an anti-pattern. I'd look towards
the code base I'm assigned to for direction.

---

I will update this README as I continue.