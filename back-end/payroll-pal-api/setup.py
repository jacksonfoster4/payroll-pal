import setuptools


setuptools.setup(
    name="payroll-pal-jackson-foster", # Replace with your own username
    version="0.0.1",
    author="Jackson Foster",
    author_email="jackson@jacksonwfoster.com",
    description="A client for BBSI time tracking portal built with Selenium and Flask",
    url="https://github.com/jacksonfoster4/payroll-pal",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)