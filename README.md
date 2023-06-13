# count-set-bits

## Inspiration

During a recent job search, I was tasked with writing a program that counted the number of set bits in an unsigned 8-bit integer
and I really enjoyed coming up with some of my own solutions and then diving deeper into some more sophisticated ones.

I came across Brian Kernighan's algorithm to count set bits in an integer and thought it was super neat and showcased
some cool and easy to understand usage of bitwise operators.

So I thought it would be cool to develop a sort of interactive and visual tool that people can use to learn more about how the algorithm works!

The following is a pseudo code example of the algorithim:

```
function countSetBits(n):
    count = 0
    while n is not equal to 0:
        n = n AND (n - 1)
        count = count + 1
    return count
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Goals

### Project

- Simple example of an 8-bit unsigned integer displayed in binary with toggleable bits and display the decimal value.
- TODO: Include sections that give some background information on the algorithm and whatever concepts one might need in order to understand it.
- TODO: Allow users to enter digit values (0-255) and update the binary value to match.
- TODO: Animate a simple implementation of BK's algorithm so that it can be easily visualized and hopefully be easier for people to learn

### Personal

- Learn more about Redux
- Try out Vite
- Improve my TypeScript abilities
- Get used to writing tests (aka write some Jest tests)
