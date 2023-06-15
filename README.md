# binary-visualizer... and more

## Inspiration

During a recent job search, I was tasked with writing a program that counted the number of set bits in an unsigned 8-bit integer
and I really enjoyed coming up with some of my own solutions and then diving deeper into some more sophisticated ones.

I came across Brian Kernighan's algorithm to count set bits in such an integer and thought it was super neat and showcased
some cool and easy to understand usage of bitwise operators.

So I thought it would be cool to develop a sort of interactive and visual tool that people can use to learn more about binary numbers and how the algorithm works!

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

- Display an 8-bit unsigned/signed integer displayed as a binary number with toggleable bits.
- Display the decimal value of the binary number entered by users and allow users to to enter custom digit values (0-255 when unsigned and -128 to 127 when signed) to get the coorelating binary number representation.
- TODO: Include sections that provide background information on binary numbers and any prerequisite knowledge that would be helpful to understand the algorithm.
- TODO: Animate a simple implementation of BK's algorithm on the UI so that the process is 100% visual and can be understood step-by-step.

### Personal

- Learn more about Redux
- Try out Vite
- Improve my TypeScript abilities
- Get used to writing tests (aka write some Jest tests)
