# reactlibs-ts

This is a refactor of my original [`reactlibs`](https://github.com/landisdesign/reactlibs)
project, using TypeScript and classes for my React components. I haven't
explored TypeScript much, but it is useful for larger projects, so this is a
playground. Also, while functional components and hooks are much simpler for
me, I can imagine well-established codebases being primarily class-based, so it
will be valuable for me to get some practice with that.

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
having to change the return type definition. Honestly, letting TypeScript
decide these types instead of me consciously defining them feels fast but
not deliberate. As I continue, I may undo this and try it again with less
handwritten definition.

I'm choosing to type the state pretty heavily, to allow it to take care of
its own management. By creating a `Cloneable<T>` interface, the top level of
state doesn't need to know how to duplicate itself. It just needs to tell its
members to clone themselves.

Similarly I can enforce the immutability of array entries and object fields by
making them private and providing accessor methods, in addition to making the
fields inm the parent objects themselves readonly.

Any calculation to create object state is done in the constructor. This lets
me keep the reducers much smaller, simply retrieving payloads and delivering
them to the constructors, to return fully formed state structures with helpful
methods.

I can see development speed benefits in simply converting incoming JSON via
interfaces, and leaving it at that. I'm not sure if one is more of an
anti-pattern than the other, but I'd follow the conventions of the code base
I'm working on.

## First Impressions: Classes vs Functional Components

I converted all of my components to classes. This is obviously extreme, but I
wanted the practice and the capacity to make class-based components without
thinking about it. Repetition trains the fingers! In real life there would be a
balance, as well as following conventions in the code base I work in.

As I'm converting my original, hook-based React project, I'm realizing that
hooks hide a lot of the complexity of state and lifecycle management. While
that made life easier, it kept me from understanding what happens under the
hood in a complex component. It gave me more freedom to bring in state at the
moment I needed it, but also made it easier to increase function size and
variable lifespan, which can make it harder to read a functional, hook-based
component.

I appreciate the separation of concerns inherent in a class-based
component, especially how it makes the `render()` method tight and
single-focused, pure without side effects. Purity goes out the window with
hooks.

That being said, class-based components help me see the weaknesses in my
earlier hook-based components, and encourages me to refactor my earlier project
to more clearly separate logic and presentation.

---

I will update this README as I continue.