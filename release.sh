echo "Uploading bundle.js"
aws s3 cp static/bundle.js s3://tomhadlaw.xyz/bundle.js --acl public-read
echo "Uploading index.html"
aws s3 cp static/index.html s3://tomhadlaw.xyz/index.html --acl public-read

echo "Creating version.txt"
cat package.json | jq -r .version > version.txt
aws s3 cp version.txt s3://tomhadlaw.xyz/version.txt --acl public-read
