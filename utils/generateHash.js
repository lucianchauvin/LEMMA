import { hash } from '@node-rs/argon2';

const args = process.argv.slice(2); 

if (args.length !== 1) {
  console.log(`Usage: node ${process.argv[1]} <password>`);
  process.exit(1);
}

const [password] = args;

const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
});

console.log(passwordHash);
